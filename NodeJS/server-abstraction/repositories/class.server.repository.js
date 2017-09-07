/**
 * Created by rajnish on 4/20/2016.
 */

'use strict';

const mongoose = require("mongoose");
const Class = mongoose.model("Class");

class ClassRepository extends _clsClass {

    constructor(loaderService) {
        super();
        this.loaderService = loaderService;
    }

    find() {
        return Class.find();
    }

    findById(classId) {
        return Class.findById(classId);
    }

    getSkillWiseChunkCount(classId) {
        let mapReduceConfig = {};
        mapReduceConfig.map = function(){
            for(var key in this.toc.resources.generic){

                this.toc.resources.generic[key]['learning-objectives'].forEach(function(lobjective){
                    emit(lobjective,1);
                })
            }
        };

        mapReduceConfig.reduce = function(skillName,values){
            return Array.sum(values);
        };
        mapReduceConfig.query = {_id: mongoose.Types.ObjectId(classId)};

        return Class.mapReduce(mapReduceConfig);

    }

    getTagWiseChunkCount(classId) {
        let mapReduceConfig = {};
        mapReduceConfig.map = function(){
            for(var key in this.toc.resources.generic){

                this.toc.resources.generic[key]['tags'].forEach(function(tag){
                    emit(tag,1);
                })
            }
        };

        mapReduceConfig.reduce = function(skillName,values){
            return Array.sum(values);
        };
        mapReduceConfig.query = {_id: mongoose.Types.ObjectId(classId)};

        return Class.mapReduce(mapReduceConfig);
    }
}

function _clsClass() {
    this.classId = '-';
    this.productId = '-';
    this.title = '-';
    this.productTitle = '-';
    this.startDate = '-';
    this.endDate = '-';
    this.instructorId = '-';
    this.instructorName = '-';
};

module.exports = ClassRepository;
