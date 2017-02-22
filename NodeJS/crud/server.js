const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const userController = require("./controller/userController");
const db = require("./config/db");

// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(4000, () => {
    console.log('listening on 4000');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html");
});

app.get("/create", (req, res) => {
    res.render('create', {});
});

app.post("/addUser", (req, res) => {
    userController.create(req, res);
});

app.get("/getAllUser", (req, res) => {
    userController.getAll(req, res);
});

app.get("/userById", (req, res) => {
    res.render('userbyid', {actionUrl: "userbyid", buttonText: "Get User"});
});

app.post("/userbyid", (req, res) => {
    userController.getById(req.body.userid, res);
});

app.get("/updateUser/:id", (req, res) => {
    userController.getUser(req.params.id, res, (err, user) => {
        if (!err) {
            return res.render('updateUser', user);
        } else {
            return res.send(err);
        }
        
    });
});

app.post("/updateUser/updatebyid", (req, res) => {
    userController.update(req, res);
});

app.get("/delete", (req, res) => {
    res.render('userbyid', {actionUrl: "deleteuserbyid", buttonText: "Delete User"});
});

app.get("/deletebyid/:id", (req, res) => {
    let condition = {}
    condition._id = req.params.id;
    userController.delete(condition, res);
});