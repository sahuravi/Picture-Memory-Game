/*************************************************************************
 *
 * COMPRO CONFIDENTIAL
 * __________________
 *
 *  [2015] - [2020] Compro Technologies Private Limited
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Compro Technologies Private Limited. The
 * intellectual and technical concepts contained herein are
 * proprietary to Compro Technologies Private Limited and may
 * be covered by U.S. and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law.
 *
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Compro Technologies Pvt. Ltd..
 ***************************************************************************/

 /**********************************************************************
 * Provides functions for user authentication
 ***********************************************************************/
'use strict';


/************************************
* Internal npm Modules
************************************/
// App Config
var config = require('../config');
//Get App environment
var appEnv = require('../config/env').appEnv;
//Get DLS environment
var dlsEnv = require('../config/env').dlsEnv;
//Request Utilities
var reqUtils = require('../libs/request-utils');
//Redis Connector
var redis = require('../libs/redis');
// Error Handler
var errorHandler = require('../error/error-handler');

/************************************
* External npm Modules
************************************/
// comproDLS SDK
var comproDLS = require('comprodls-sdk').init(dlsEnv);

/************************************
* Private Variables
************************************/
//Auth Cookie name (Contains user and org info)
var authCookieName = "dls_config";

/************************************
* Module exports / Public functions
************************************/ 
exports.otaStep1 = otaStep1;
exports.otaStep2 = otaStep2;
exports.isAuthenticated = isAuthenticated;
exports.tokenAuthentication = tokenAuthentication;
/************************************
* Public function definitions
************************************/

//Handle the first step One time authentication (used for getting Verification Question using encoded Key)
function otaStep1(req, res){
    var appContext = {};
    getOTAUrlVerificationQuestion()
    .then(getOTAUrlVerificationQuestionSuccess)   
    .catch(errorCatcher);

    //Get OTAUrlVerificationQuestion 
    function getOTAUrlVerificationQuestion() {
        var auth = comproDLS.Auth();
        return auth.getOTAUrlVerificationQuestion({orgid : config.app.otaOrgid , encoded_key: req.params.encodedKey});
    } 

    //Get OTAUrlVerificationQuestion success handler
    function getOTAUrlVerificationQuestionSuccess(response) {
        //Used to store app context to be stored in index.hbs
        appContext.AUTH_METHOD = "OTA"; 
        appContext.OTA = response;
        appContext.OTA.encoded_key = req.params.encodedKey; 
        //redirect the app 
        redirectApp(req,res,appContext)
    }
 
    //Catch errors
    function errorCatcher(err) {
        appContext.ERROR = { message : "Invalid URL" , description : "The URL does not exist. You may have mistyped the URL, or it may no longer be available. Please check the URL in the address bar and try again."};
        redirectApp(req,res,appContext)
    }
}

/*Handle the second step One time authentication 
* (used to  get user info (token, roles, uuid etc) 
* and other data (uri,host, params orgid etc) 
* using verification answer and encoded key */

function otaStep2(req,res) {
  getTokenFromOTAUrl()
  .then(getTokenFromOTAUrlSuccess)
  .catch(errorCatcher);

    //Get getTokenFromOTAUrl
    function getTokenFromOTAUrl(){
        var auth = comproDLS.Auth();
        return auth.getTokenFromOTAUrl({orgid : config.app.otaOrgid , encoded_key : req.body['encoded_key'], verification_answer : req.body['verification_answer']});
    }

    //Get TokenFromOTAUrlSuccess success handler
    function getTokenFromOTAUrlSuccess(response){

        var userRole = response.target_user.roles[0] ;

        // If the role of user is not allowed , send errorresponse
        if(config.app.allowedUserRoles.indexOf(userRole) == -1){
            return errorHandler.errorController(req, res, {
                success:false, 
                message: 'Unauthorized: Role ' + user.role_primary + ' is not allowed access'
            }, {
                hideErrorOnFrontend: true, 
                skipLoggingError: true
            });            
        } else {

            //Create user object to store/serialize in session
            var user = {};
            user['username'] = response.target_user.name;     
            user['userid'] = response.target_user.uuid;
            user['name'] = response.target_user.name;    
            user['orgid']= config.app.otaOrgid; 
            user['expires_in'] = response.target_user.expires_in;
            user['access_token'] = response.target_user.access_token;
            user['refresh_token'] = response.target_user.refresh_token;        
            user['role_primary'] = userRole;  

            //Passport Login
            req.logIn(user, function(err) {
                //If error logging in passport, send error response
                if (err) {  
                    errorHandler.errorController(req, res, {success:false, message:'Internal server error', err : err}, {hideErrorOnFrontend : true});
                }
                //Store orgid and token in session
                req.session.orgid = response['orgid'];
                req.session.expiresIn = response['target_user']['expires_in'];
                req.session.accessToken = response['target_user']['access_token'];
                req.session.refreshToken = response['target_user']['refresh_token'];
                req.session.userid = response['target_user']['uuid'];

                //Create additional Auth cookie to store user and org data
                var authcookieConfig = {};
                var authCookieJSON = {
                  "userid": response["target_user"]["uuid"],
                  "orgid": req.session.orgid,
                  "sso": false,
                  "role" : userRole
                }
                if (config.app.sso.enabled) {            
                  authCookieJSON.sso = true;            
                  authCookieJSON.env = appEnv;
                  authcookieConfig.domain = config.app.sso.domain;
                }
                res.cookie(authCookieName,JSON.stringify(authCookieJSON), authcookieConfig); 
                //Send success response                        
                return res.status(200).send({success:true, response:response});
            });     
        }
    }

    //Catch errors
    function errorCatcher(err) {
      var skipLoggingError = false;
      // Dont log error for Invalid credentials. Log all other errors
      if (err.httpcode >= "400" && err.httpcode < "500") {
          skipLoggingError = true;
      }
      errorHandler.sdkErrorController(req, res, {success:false, error : err}, {hideErrorOnFrontend : true, skipLoggingError: skipLoggingError});        
    }
}

function isAuthenticated (req, res, next) {
    if (!req.isAuthenticated()) {
        var errorMessage = "AUTHORIZATION-ERROR: Unauthorized request, Request Path=" + req.path;
        if(!redis.redisConnected()){
            errorMessage = "AUTHORIZATION-ERROR: Redis Unavailable, Request Path=" + req.path;
        }
        errorHandler.errorController(req, res, {"message":"Unauthorized"} , {statusCode : 401});
    } else {
        next();
    }    
}

//Authenticate using token present in url (as query param)
function tokenAuthentication(req, res) {
    var appContext = {};
    try {
      //Get Access token from query
      var token = JSON.parse(new Buffer(req.query.token, 'base64').toString('ascii')); 
    } catch(ex){
      appContext.ERROR = { message : "Invalid Token or Orgid" , description : "The token or orgid is not valid. Please try again with valid inputs."};
      redirectApp(req,res,appContext);
    }
    
   
    //Get OrgID from query
    var orgid = req.query.orgid;

    comproDLS.authWithToken(orgid, token , {})
    .then(authSuccess)
    .then(getUserProfile)
    .catch(errorCatcher);

    //Auth success handler
    function authSuccess(success) {
        var auth = comproDLS.Auth();
        return auth.getUserProfile({metrics: true});    
    }
    //User profile success handler
    function getUserProfile(response) {
      var userRole;
      if(response.roles.admin){
        userRole = 'admin';
      } else if(response.roles.teacher){
        userRole = 'teacher';
      } else if(response.roles.student){
        userRole = 'student';
      }
      // If the role of user is not allowed , send errorresponse
      if(config.app.allowedUserRoles.indexOf(userRole) == -1){
        appContext.ERROR = { message : "Not Authorized" , description : "User with " + userRole + " role does not have permissions to view this content. If you believe this is an error, please contact your system administrator."};
        redirectApp(req,res,appContext);

      } else {
        //Create user object to store/serialize in session
        var user = {};
        user['username'] = response['username'];     
        user['userid'] = response['uuid'];
        user['name'] = response['name'];      
        user['orgid']= response['org']['id'];
        user['access_token'] = token['access_token'];
        user['expires_in'] = token['expires_in'];
        user['refresh_token'] = token['refresh_token']; 
        user['role_primary'] = userRole;

        req.logIn(user, function(err) {            
            //If error logging in passport, send error response
            if (err) { 
              appContext.ERROR = { message : "Internal server error" , description : err};
              redirectApp(req,res,appContext); 
            }

            //Store orgid and token in session
            req.session.orgid = user['orgid'];
            req.session.accessToken = user['access_token'];
            req.session.expiresIn = user['expires_in'];
            req.session.refreshToken = user['refresh_token'];    
            req.session.userid = user['userid'];

            //Create additional Auth cookie to store user and org data
            var authcookieConfig = {};
            var authCookieJSON = {
              "userid":user.userid,
              "orgid":req.session.orgid,
              "sso":false,
              "role" : user.role_primary
            }
            if (req.body.staySignedIn) {
              //Setting cookie age to 7 days (if stay signed is checked)
              req.session.cookie.maxAge = config.app.session.staySignInAge;
              authcookieConfig.maxAge = config.app.session.staySignInAge;
            }
            if (config.app.sso.enabled) {            
              authCookieJSON.sso = true;            
              authCookieJSON.env = appEnv;
              authcookieConfig.domain = config.app.sso.domain;
            }
            res.cookie(authCookieName,JSON.stringify(authCookieJSON), authcookieConfig);
            
            //Delete token from user object (to be sent in response) for security
            delete user.access_token;
            delete user.refresh_token;
            delete user.expires_in;
             //Used to store app context to be stored in index.hbs
            appContext.AUTH_METHOD = 'tokenAuth'; 
            appContext.TOKEN_AUTH = {'launchUrl' : req.query.launch_url};         
            //Send success response      
            redirectApp(req, res, appContext)
        });
      }  
         
    }
    //Catch errors
    function errorCatcher(err) {
      appContext.ERROR = { message : "Invalid Token or Orgid" , description : "The token or orgid is not valid. Please try again with valid inputs."};
      redirectApp(req,res,appContext);
    }
}

/************************************
* Private function definitions
************************************/
//Function to redirect the app
function redirectApp(req, res, appContext, disableQueryParam){

    if(appContext){
      req.session.appContext = appContext;
    } 
    var protocol = reqUtils.isHttps(req) ? "https" : "http";
    var url = null;
    if(disableQueryParam) {
         url = protocol + '://'+ req.headers.host;
   } else {
       url = protocol + '://'+ req.headers.host + reqUtils.getQueryParamsString(req);

    }
    res.redirect(url);
}
