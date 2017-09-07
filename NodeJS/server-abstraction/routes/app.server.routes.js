'use strict';

/*
 * Importing services
 */
const request = require('request');
var expressApp;

/*
 * Importing domain entities
 */

var classRepository = require('../repositories/class.server.repository.js');
var productRepository = require('../repositories/product.server.repository.js');
var adaptiveSessionRepository = require('../repositories/session.server.repository.js');

const fsLoaderService = require('../services/loader/fs/fsloader.server.service.js');

module.exports = function (app) {

    expressApp = app;

/*    app.use('/', function (req, res, next) {
        if (req.url === '/' || req.url === '/api/login' || req.url === '/api/logout' || req.isAuthenticated() ) {
            next();
        } else {
            res.status(401).send({
                message: 'User is not logged in'
            });
        }
    });*/

    app.get('/', function(req, res) {
        res.render('index', {
            user: req.user || null,
            helpers: {
                json: function(context) {
                    return JSON.stringify(context);
                }
            }
        });
    });

    /*
        Route definition
     */
    registerLTIEndpoint(
        require('../controllers/gateway-handler.server.controller')()
    );
    registerEndpoint(
        require('../controllers/appcontext.server.controller')()
    );
    registerEndpoint(
        require('../controllers/users.server.controller')()
    );
    registerEndpoint(
        require('../controllers/class.server.controller')(
            new classRepository(fsLoaderService)
        )
    );
    registerEndpoint(
        require('../controllers/product.server.controller')(
            new productRepository(fsLoaderService)
        )
    );
    registerEndpoint(
        require('../controllers/session.server.controller')(
            new adaptiveSessionRepository()
        )
    );
    registerEndpoint(
        require('../controllers/search.controller')()
    );

};

function registerEndpoint(endpoint) {
    expressApp.use('/api/', endpoint);
}

function registerLTIEndpoint(endpoint) {
    expressApp.use('/lti/', endpoint);
}
