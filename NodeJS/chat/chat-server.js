var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

server.listen(9000, () => {
    console.log("chat server listening on port 9000")
});

io.on('connection', function (socket) {
    debugger;
    let olderData = null;
    setInterval(() => {
        fs.readFile(__dirname + '/test.txt', (err, data) => {
            if (err) {
                socket.emit('news', {
                    data: Error.message
                });
            } else {
                if (olderData !== data.toString()) {
                    console.log("aaya..");
                    olderData = data.toString();
                    socket.emit('news', {
                        data: olderData
                    });
                }
            }
        });
    }, 1000);
});

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
});