/**
 * Created by rajnish on 4/20/2016.
 */

'use strict'
const error = require("./../services/error/apperror.server.service.js");
var _ = require('lodash');
const transformObjectToArray = require("../services/utils/dls.server.util.js").transformObjectToArray;

class ProductRepository extends _product {

    constructor(loaderService) {
        super();
        this.loaderService = loaderService;
    }

    find() {
        return this.loaderService
            .readDirectoryFiles(__dirname + '/../services/loader/fs/products/')
            .then(function(products){
                sortingBasedOnProperty(personas,"index");
                return personas;
            })
    }

    findById(productId) {
        return this.loaderService
            .readJSON(`${__dirname}/../services/loader/fs/products/${productId}.json`)
            .then(function(product){
                product.definition["learning-objectives"] = transformObjectToArray(product.definition["learning-objectives"]);
                product.definition["learning-objectives"].shift();
                return product;
            })
    }

}

function _product() {

    this.id = '-';
    this.meta = {
        title: '-',
        producttype : '-'
    }

}



module.exports = ProductRepository;
