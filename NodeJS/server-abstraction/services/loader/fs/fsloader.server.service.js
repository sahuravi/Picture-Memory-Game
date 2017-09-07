'use strict';

const fs = require('fs');
//const DataLoader = require('../dataloader.server.service.js');

class FSLoaderService {
    constructor() {

    }

    readDirectoryFiles(dirPath) {
        let self = this;
        return new Promise(function(resolve,reject){
            fs.readdir(dirPath,function(err,filenames){
                if(err){
                    return reject(err);
                }
                resolve(Promise.all(filenames.map(function(filename) {
                    return self.readJSON(dirPath + filename);
                })));
            })
        });
    }

    readJSON(filePath){
        return new Promise(function(resolve,reject){
            fs.readFile(filePath, 'utf-8', function(err,content){
                if(err){
                    return reject(err);
                }
                resolve(JSON.parse(content));
            })
        })
    }
}

module.exports = new FSLoaderService();