'use strict';

const appError = require("./../services/error/apperror.server.service.js");
const router = require('express').Router();
const request = require('request');
//Session Utilities
var sessionUtils = require('../libs/session-utils');
//Get DLS environment
var dlsEnv = require('../config/env').dlsEnv;
var comproDLS = require('comprodls-sdk').init(dlsEnv);

module.exports = function(classRepository) {

    router.get('/classes', async function (req, res, next) {

      //Get user DLS token stored in session
      let token = sessionUtils.getTokenFromSession(req);
      //Get OrgID from session
      let orgid = req.session.orgid;

      comproDLS.authWithToken(orgid, token, {})
          .then(authSuccess)
          .catch(errorCatcher);

      //Auth success handler
      function authSuccess(success) {
          var auth = comproDLS.Auth();
          var classParams = {
              details: true
          };

          var dlsPromise;
          if (req.user.role_primary === 'student' || req.user.role_primary === 'teacher') {
              dlsPromise = auth.getUserClasses(classParams);
          } else {
              dlsPromise = auth.getAllClasses(classParams);
          }

          dlsPromise.then(
              function success(response) {
                  res.json(response);
              },
              function error(err) {
                  errorCatcher(err);
              }
          );
      }

      //Catch errors
      function errorCatcher(err) {
          var type = err["type"];
          if (type == "API_ERROR") {
              if (err["httpcode"] == 401) {
                  //Invalid Credentials
                  console.log(err.message);
              }
          } else  if (type == "SDK_ERROR") {
              console.log(err.message);
          }
      }

    });

    router.get('/classes/:classId', async function (req, res, next) {

      //Get user DLS token stored in session
      var token = sessionUtils.getTokenFromSession(req);
      //Get OrgID from session
      var orgid = req.session.orgid;

      comproDLS.authWithToken(orgid, token , {}).then(
        function success(success) {

          var auth = comproDLS.Auth();
          var classParams = {
            details: true
          };

          auth.getParticularClass(classParams).then(
            function success(response) {
              res.json(response);
            },
            function error(err) {
              var type = err["type"];
              if (type == "API_ERROR") {
                if (err["httpcode"] == 401) {
                  //Invalid Credentials
                  console.log(err.message);
                }
              } else  if (type == "SDK_ERROR") {
                console.log(err.message);
              }
            }
          );

        }
      );

    });

    return router;
};
