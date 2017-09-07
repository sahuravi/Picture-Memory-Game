/**
 * Created by rajnish on 5/13/2016.
 */

'use strict'

let mocha = require('mocha');
let should = require('should');
let mockery = require('mockery');

describe("Class Repository Tests", function() {

    before(function () {

        mockery.enable({
            unrigestered: false
        })

        mockery.registerMock('../../services/loader/fs/fsloader.server.service.js','../mocks/fsloader.server.mocks.js');

        let clsClassRepository = require('../../repositories/class.server.repository');
        let fsLoader = require('../../services/loader/fs/fsloader.server.service.js');

        this.classRepository = new clsClassRepository(fsLoader);
    });

    after(function() {
        mockery.disable();
    });

    it("check that list of classes are being retrieved", function(done) {

        this.classRepository
            .find()
            .then(function (classes) {
                try {
                    classes.length.should.eql(2);
                    classes[0].title.should.eql('Class 1');
                    done();
                } catch (err) {
                    done(err);
                }
            });
    });
});