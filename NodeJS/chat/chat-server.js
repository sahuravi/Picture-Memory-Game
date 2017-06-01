var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

server.listen(9000, () => {
    console.log("chat server listening on port 9000")
});

io.on('connection', function (socket) {debugger;
    setInterval(() => {
        fs.readFile(__dirname + '/index.html', (err, data) => {
            if (err) {
            }
            socket.emit('news', {data: data.toString()});
        });
    }, 10000);
    
    socket.on('my other event', function (data) {
        console.log(data);
    });
});