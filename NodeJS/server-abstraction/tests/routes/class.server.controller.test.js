/**
 * Created by rajnish on 5/11/2016.
 */

'use strict'

let mocha = require('mocha');
let http_mocks = require('node-mocks-http');
let should = require('should');
let mockery = require('mockery');

function buildResponse() {
    return http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
}

describe('Class Controller Unit Tests', function() {

    before(function() {
        mockery.enable({
            warnOnUnregistered: false
        })

        mockery.registerMock('../../repositories/class.server.repository',
            require('../mocks/class.server.repository.mock'));

        mockery.registerMock("./../services/error/apperror.server.service.js",
            require('../mocks/apperror.mock'));

        var repository = require('../../repositories/class.server.repository');
        this.controller = require('../../controllers/class.server.controller')(
            new repository()
        );

    });

    after(function() {
        mockery.disable();
    });

    it('get list of classes', function(done) {

        var response = buildResponse();
        var request  = http_mocks.createRequest({
            method: 'GET',
            url: '/classes'
        });

        response.on('end', function() {

            try { // boilerplate to be able to get the assert failures
                response._isJSON().should.be.true;
                var data = JSON.parse(response._getData());
                should.not.exist(data.error);
                data.length.should.eql(2);
                data[0].title.should.eql("Class 1");
                data[1].title.should.eql("Class 2");
                done();
            } catch (err) {
                done(err);
            }

        });

        this.controller.handle(request, response);
    });

    it('get a specific class', function(done) {

        var response = buildResponse();
        var request = http_mocks.createRequest({
            'method': 'GET',
            'url': '/classes/df042b08-9bef-490e-b428-370adf3a6e7a'
        });

        response.on('end',function() {

            try {

                response._isJSON().should.be.true;
                var data = JSON.parse(response._getData());
                should.not.exist(data.err);
                data.title.should.eql('Class 1');
                done();

            } catch (err) {
                done(err);
            }

        });

        this.controller.handle(request,response);

    });

    it('get an invalid class', function(done) {

        var response = buildResponse();
        var request = http_mocks.createRequest({
            'method': 'GET',
            'url': '/classes/invalid-class-id'
        });

        response.on('end',function() {

            try {

                response._isJSON().should.be.true;
                var data = response._getData();
                should.not.exist(data.err);
                data.should.eql('');
                done();

            } catch (err) {
                done(err);
            }

        });

        this.controller.handle(request,response);

    });

})