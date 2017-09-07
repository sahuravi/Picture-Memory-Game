'use strict';

var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
    "classId" : {
        type: mongoose.Schema.Types.ObjectId
    },
    "model": {
        "_id": {
            type: Number
        },
        "name": {
            type: String
        }
    },
    "userId": {
        type: String
    },
    "sessionType": {
        type: String
    },
    "personas": {}

});

mongoose.model("Sims_session",sessionSchema);