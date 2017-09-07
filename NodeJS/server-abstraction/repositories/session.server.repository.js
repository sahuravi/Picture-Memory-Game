/**
 * Created by rajnish on 4/20/2016.
 */

'use strict'

const mongoose = require('mongoose');
const adaptiveSession = mongoose.model("Sims_session");


class AdaptiveSessionRepository extends _session {

    constructor() {
        super();
    }

    findByClassId(classId) {
        console.log("ClassId",classId);
        return adaptiveSession.find({"classId": classId});
    }

    findById(sessionId) {
        //tbd
        return adaptiveSession.findById(sessionId);
    }

}

function _session() {

    //tbd

}

module.exports = AdaptiveSessionRepository;
