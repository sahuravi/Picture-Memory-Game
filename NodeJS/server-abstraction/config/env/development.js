var DB_HOST = "localhost";

var config = {
    //Hosts
    "mongoDBConfig": {
        dbUri: "ds159662.mlab.com:59662/stand-alone",
        dbOptions: {
            db: {
                native_parser: true
            },
            server: {
                poolsize: 20
            },
            user: 'stand-alone-sims',
            pass: 'stand-alone-sims'
        }
    },
    "searchEngineConfig": {
        "searchType": "es",
        "es": {
            "url": "https://vhq9yejt8l:1sita01bx6@first-cluster-5357211792.us-east-1.bonsaisearch.net"
        },
        "baloo": {}
    }
};

module.exports = exports = config;