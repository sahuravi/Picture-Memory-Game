'use strict';

var mongoose = require("mongoose");

var classSchema = new mongoose.Schema({
   "productId": {
       type: String
   },
    "productTitle": {
      type: String
    },
    "instructor":{
        "id": {
            type: String
        },
        "name": {
            type: String
        }
    },
    "simulations":{
      type: Number
    },
    "adaptiveEnabled": {
      type: Boolean
    },
    "title": {
        type: String
    },
    "courseStatus": {
        type: String
    },
    "imageUrl": {
        type: String
    },
    "startDate": {
        type: Date
    },
    "endDate": {
        type: Date
    },
    "toc": {},
    "gexf": {
        type: String
    }
});

mongoose.model("Class",classSchema);