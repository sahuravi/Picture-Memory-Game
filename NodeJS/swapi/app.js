const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const request = require('request');

var router = express.Router();
//var appRouter = require('./app.route');

app.listen(4000, () => {
    console.log('server listening on port: 4000');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client')));

//router.use('/app', appRouter);
app.use(router);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'login.html'));
});

router.post('/login', (req, res) => {
    console.log(req);
    let username = req.body.user;
    let password = req.body.pass;

    request('http://swapi.co/api/people/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body)
            let users = JSON.parse(body).results;
            for (user of users) {
                if (username === user.name && password === user.birth_year) {
                    res.send("Logged in successfully.");
                }
            }
            res.send("either username or password is incorrect.");
        }
    });
});

router.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'search.html'));
});