var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

app.listen(8000, () => {
    console.log("app server listening on port 8000");
});

app.get('/', (req, res) => {
    setInterval(() => {
        fs.readFile(__dirname + '/index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
    }, 1000);
});
