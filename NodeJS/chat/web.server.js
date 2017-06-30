var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

server.listen(9000, () => {
    console.log("chat server listening on port 9000")
});

app.use(express.static(__dirname));

io.on('connection', function (socket) {

    fs.watch('./test.txt', (event, fileName) => {
        if (event === 'change') {
            fs.readFile('./test.txt', (error, fileData) => {
                if (error) {
                    socket.emit('news', {
                        data: error.message
                    });
                } else {
                    socket.emit('news', {
                        data: fileData.toString()
                    });
                }
            });
        }
    });
});

app.get('/', (req, res) => {
    res.send('index.html');
    // fs.readFile(__dirname + '/test.txt', (err, data) => {
    //     if (err) {
    //         res.writeHead(500);
    //         return res.end('Error loading index.html');
    //     }

    //     res.writeHead(200);
    //     res.render('index.html', {data: data});
    // });
});