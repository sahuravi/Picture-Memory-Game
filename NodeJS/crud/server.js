const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const userController = require("./controller/userController");
const db = require("./config/db");

// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require('mongoose');

app.listen(4000, function() {
    console.log('listening on 4000')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/create", function(req, res) {
    res.render('create', {});
});

app.post("/addUser", function(req, res) {
    userController.create(req, res);
});

app.get("/getAllUser", function(req, res) {
    userController.getAll(req, res);
});

app.get("/userById", function(req, res) {
    res.render('userbyid', {actionUrl: "userbyid", buttonText: "Get User"});
});

app.post("/userbyid", function(req, res) {
    userController.getById(req.body.userid, res);
});

app.get("/updateUser/:id", function(req, res) {
    userController.getUser(req.params.id, res, function(err, user) {
        if (!err) {
            return res.render('updateUser', user);
        } else {
            return res.send(err);
        }
        
    });
});

app.post("/updateUser/updatebyid", function(req, res) {
    userController.update(req, res);
});

app.get("/delete", function(req, res) {
    res.render('userbyid', {actionUrl: "deleteuserbyid", buttonText: "Delete User"});
});

app.get("/deletebyid/:id", function(req, res) {
    let condition = {}
    condition._id = req.params.id;
    userController.delete(condition, res);
});
