const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

app.listen(4000, () => {
    console.log('server listening on port: 4000');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'client')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});