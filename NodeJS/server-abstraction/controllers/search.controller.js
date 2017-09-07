'use strict';

const router = require('express').Router();
const searchEngineFactory = require('../services/search/search.engine.factory');
const config = require('../config');
const searchEngine = searchEngineFactory.getSearchEngineInstance(config.searchEngineConfig);
const queryModelService = require('../services/search/populate.query.service');
const SuccessResponse = require('../models/response.success.model');
const ErrorResponse = require('../models/response.error.model');

module.exports = function () {

    router.get('/task/search', async function (req, res, next) {
        let contentType = req.headers['accept'];
        let language = req.headers['accept-language'];

        res.format({
            'json': function () {
                try {
                    let queryModel = queryModelService.populate(req.query);

                    // Now pass the queryModel to search Engine.
                    searchEngine.search(queryModel, "task")
                        .then((result) => {
                            let successObj = new SuccessResponse();
                            successObj.setResponse(result);
                            res.setHeader('content-type', `application/json`);
                            res.status(200).json(successObj);
                        })
                        .catch((error) => {
                            let errorObj = new ErrorResponse();
                            errorObj.setMessage(error.message);
                            errorObj.setCode(500);
                            res.status(500).json(errorObj);
                        });
                } catch (error) {
                    let errorObj = new ErrorResponse();
                    errorObj.setMessage(error.message);
                    errorObj.setCode(400);
                    res.status(400).json(errorObj);
                }
            },
            'default': function () {
                let errorObj = new ErrorResponse();
                errorObj.setMessage("Not Acceptable.");
                errorObj.setDescription("Content-Type for which you are looking to get response is not supported.");
                errorObj.setCode(406);
                res.status(406).json(errorObj);
            }
        });
    });

    return router;
};