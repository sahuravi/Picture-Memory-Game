const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const userController = require("./controller/userController");
const db = require("./config/db");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require('mongoose');

app.listen(4000, function() {
    console.log('listening on 4000')
});

redirect = function(res, filePath) {
    res.sendFile(__dirname + filePath);
}

app.get("/", function(req, res){
    redirect(res, "/index.html");
});

app.get("/create", function(req, res){
    redirect(res, "/views/create.html");
});

app.post("/addUser", urlencodedParser, function(req, res) {
    debugger;
    userController.create(req, res);
});
