'use strict';

const error = require("./../services/error/apperror.server.service.js");
const router = require('express').Router();
const request = require('request');
var sessionUtils = require('../libs/session-utils');
var comproDLS = require('comprodls-sdk').init('staging1');

var _ = require('lodash');

module.exports = function(productRepository) {

    router.get('/products/class/:classId/user/:userId', async (req, res, next) => {

        //Get user DLS token stored in session
        let token = sessionUtils.getTokenFromSession(req);
        //Get OrgID from session
        let orgid = req.session.orgid;
        var classId = req.params.classId;
        var userId = req.params.userId;

        comproDLS.authWithToken(orgid, token, {})
            .then(authSuccess)
            .catch(errorCatcher);

        //Auth success handler
        async function authSuccess(success) {
            var respJson = {};

            var auth = comproDLS.Auth();
            var classParams = {
                classId: classId
            };
            const classResponse = await auth.getParticularClass(classParams);

            let productId = classResponse['products'][0].uuid;
            respJson.meta = classResponse['products'][0].meta;
            respJson.uuid = productId;

            var analytics = comproDLS.Analytics();
            var analyticsParameters = {
                productid: productId,
                classid: classId,
                userid: userId,
                type: "items"
            };

            const response2 =  await analytics.getUserProductAnalytics(analyticsParameters);
            respJson.toc = response2.result;

            return res.json(respJson);
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

    return router;

}
