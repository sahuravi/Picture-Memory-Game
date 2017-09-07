'use strict';

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var crypto = require('crypto');
var comproDLS = require('comprodls-sdk').init('staging1');

var hashPassword = function(password, saltValue) {
    return crypto.pbkdf2Sync(password, saltValue, 10000, 64).toString('base64');
};

module.exports = function(passport) {

    // passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null,user);
        /*knex.select().from('users').where({'id': id}).asCallback(function(err, rows){
            done(err, rows[0]);
        });*/
    });



    passport.use(
        'dls-login',
        new LocalStrategy({
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback: true
            },//

            function(request, username, password, done) {

                let organization = request.body.orgid;

                comproDLS.authWithCredentials(organization, {username: username, password: password}, {}).then(
                    function success(response) {
                        //You may persist token object in session/localstorage etc. for later usage.
                        var token = response["token"];
                        //console.log(token.expires_in);

                        //user object contains user information
                        var user = response["user"];
                        console.log("USER %%%%%%%%%%%%%%%%%%%%%%%% ",user);
                        //console.log(user.roles);

                        //org object contains organisation information
                        var org = response["user"]["org"];
                        //console.log(org["type"]);

                        return done(null,response);
                    },
                    function error(err) {
                        var type = err["type"];
                        if (type == "API_ERROR") {
                            if (err["httpcode"] == 401) {
                                //Invalid Credentials
                                //console.log(err.message);
                            }
                        } else  if (type == "SDK_ERROR") {
                            //console.log(err.message);
                        }
                        return done(err);
                    }
                );

            })
    );
};


