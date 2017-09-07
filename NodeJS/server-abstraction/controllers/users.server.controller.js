'use strict';

/* Dependencies */
const router = require('express').Router();
const config = require('../config/index');
const request = require('request');
//Get App environment
var appEnv = require('../config/env').appEnv;

//Get DLS environment
var dlsEnv = require('../config/env').dlsEnv;

// comproDLS SDK
var comproDLS = require('comprodls-sdk').init(dlsEnv);

//Auth Cookie name (Contains user and org info)
var authCookieName = "dls_config";

module.exports = function() {

    //Authenticate Login Request
    router.post('/login', (req, res, next) => {

        //Get credentials from request
        var username = req.body["username"];
        var orgid = req.body["orgid"];
        var password = req.body["password"];

        //Authenticate with comproDLS SDK
        comproDLS.authWithCredentials(orgid, {username: username, password: password}, {})
            .then(authSuccess)
            .catch(authFailure);

        function authSuccess(response) {
            //Create user object to store/serialize in session
            var user = {};
            user['username'] = username;
            user['userid'] = response['user']['uuid'];
            user['name'] = response['user']['name'];
            user['orgid']= orgid;
            user['expires_in'] = response['token']['expires_in'];
            user['access_token'] = response['token']['access_token'];
            user['refresh_token'] = response['token']['refresh_token'];

            if(response.user.roles.admin){
                user.role_primary = "admin"
            } else if(response.user.roles.teacher){
                user.role_primary = "teacher"
            } else if(response.user.roles.student){
                user.role_primary = "student"
            }

            // If the role of user is not allowed , send errorresponse
            if(config.app.allowedUserRoles.indexOf(user.role_primary) == -1) {
                errorHandler.errorController(req, res, {
                    success:false,
                    message: 'Unauthorized: Role ' + user.role_primary + ' is not allowed access'
                }, {
                    hideErrorOnFrontend: true,
                    skipLoggingError: true
                });
            } else {
                //Passport Login
                req.logIn(user, function(err) {
                    //If error logging in passport, send error response
                    if (err) {
                        errorHandler.errorController(req, res, {success:false, message:'Internal server error', err : err}, {hideErrorOnFrontend: true});
                    }

                    //Store orgid and token in session
                    req.session.orgid = req.body["orgid"];
                    req.session.expiresIn = user['expires_in'];
                    req.session.accessToken = user['access_token'];
                    req.session.refreshToken = user['refresh_token'];
                    req.session.appContext = { 'AUTH_METHOD' : 'login'};
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
                    delete user.expires_in;
                    delete user.access_token;
                    delete user.refresh_token;

                    //Send success response
                    res.status(200).send({success:true,user:user});
                });
            }

        }

        function authFailure(err) {
            var skipLoggingError = false;
            // Dont log error for Invalid credentials. Log all other errors
            if (err.httpcode >= "400" && err.httpcode < "500") {
                skipLoggingError = true;
            }
            var errorObject = {
                success: false,
                status: err.httpcode || '',
                message: err.message || ''
            };
            errorHandler.sdkErrorController(req, res, errorObject, {hideErrorOnFrontend: true, skipLoggingError: skipLoggingError});
        }
    });

    //Handle user logout request
    router.get('/logout', (req, res, next) => {
        //Passport logout and destroy session (and browser cookie)
        req.logout();
        req.session.destroy(function(){
            //Clear auth cookie (which was set manually)
            var authcookieConfig = {};
            if (config.app.sso.enabled) {
                authcookieConfig.domain = config.app.sso.domain;
            }
            res.clearCookie(authCookieName, authcookieConfig);
            //Return success response
            return res.status(200).send({success:true})
        });
    });

    return router;;
}