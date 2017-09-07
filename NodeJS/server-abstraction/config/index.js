'use strict';

const extend = require('extend');
const env = process.env.NODE_ENV || 'development';

/*module.exports = require('./env/' + env);*/
module.exports=extend(true,{}, require('./env/'+'all'), require('./env/' + env), get_user_home_config());

function get_user_home_config() {

    const path = require('path');
    const home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

    try {
        return require(
            home +
            "/.dls/config.js"
        );
    } catch(error) {
        return {}
    }
}