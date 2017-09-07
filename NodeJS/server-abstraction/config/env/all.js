/**
 * Created by Surbhi on 3/21/2016.
 */
var config= {
    port: process.env.PORT || 8088,
    "app" : {
        "session" : {
            // Secret for encrypting session cookie
            "cookie-secret": "compro123",
            //Max age of Stay SignIn cookie (7 days)
            "staySignInAge": 604800000,
            "redis" : {
                // Redis URL
                // REDISCLOUD_URL environment variable (if set) will take precedence
                "url": "redis://compro:comprodls@pub-redis-17865.us-east-1-4.6.ec2.redislabs.com:17865"
            }
        },
        "sso" : {
            //To enable Single sign on within apps
            "enabled": false,
            //Domain to use for authorization cookie in case of Single sign on
            "domain" : ".comprodls.com",
        },
        //Redirect to Https.
        //REDIRECT_TO_HTTPS environment variable (if set) will take precedence
        "redirectToHttps" : false,
        "otaOrgid" : "cdev1",
        "allowedUserRoles" : ['student','teacher','admin']
    }
};
module.exports =config;