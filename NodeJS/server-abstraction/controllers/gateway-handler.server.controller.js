'use strict';

const appError = require("./../services/error/apperror.server.service.js");
const router = require('express').Router();
const request = require('request');
var comproDLS = require('comprodls-sdk').init('staging1');
//Request Utilities
var reqUtils = require('../libs/request-utils');

module.exports = function(classRepository) {

    router.get('/instructor/config', async function (req, res, next) {

        var appContext = {};
        appContext.INSTRUCTOR_CONFIG = {contextparam: req.query};
        redirectApp(req,res,appContext, true)
    });

    return router;

}

function redirectApp(req, res, appContext, disableQueryParam){
    var dlsContext = {};
    dlsContext.DLS = {};

    if(appContext){
        dlsContext.DLS.APP = appContext;
        res.cookie("dls-context", dlsContext);
      //  req.session.appContext = appContext;
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

