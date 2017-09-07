'use strict';

class DataLoader {

    constructor() {
        if (new.target === DataLoader) throw TypeError("new of data loader is not allowed");
    }

}

module.exports = new DataLoader();