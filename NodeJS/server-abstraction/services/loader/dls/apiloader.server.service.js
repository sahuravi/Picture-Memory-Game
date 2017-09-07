'use strict';

const DataLoader = require('../services/loader/dataloader.server.service.js');

class APILoader {

    constructor() {
       console.log("this is a constructor");
    }

    getProductsByUserId (userId) {
        console.log("api loader for getProductsByUserId");
    }

    getProduct (productId) {
        console.log("api loader for getProduct");
    }

}

module.exports = APILoader;