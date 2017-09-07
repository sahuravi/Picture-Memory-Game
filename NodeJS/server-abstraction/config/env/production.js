var DB_HOST = "ds157682.mlab.com:57682";

//mongodb://<dbuser>:<dbpassword>@ds157682.mlab.com:57682/myitlab

var config = {
  // //Hosts
  // "mongoDBConfig":{
  //   dbUri: "mongodb://"+DB_HOST+"/myitlab"
  // },
  "app" : {
    "sso" : {
      //Enabling APPs SSO in prod environment
      "enabled": true
    }
  },
  "mongoDBConfig":{
    dbUri: "mongodb://"+DB_HOST+"/myitlab",
    dbOptions: {
      user: "myitlabapp",
      pass: "Compro@123",
      server: {
        poolSize: 20
      }
    }
  },
  "passport": {
    service: "dls-login"
  },
};

module.exports = exports = config;
