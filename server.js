var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(process.env.PORT || 3000, function () {
    console.log('server listening to port 3000');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var playerCount = 0;

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.emit("connect");

    playerCount++;

    for (var i = 0; i < playerCount; i++) {
        console.log('sending spawn to player');
        socket.emit('spawn');
    }

    socket.broadcast.emit('spawn');

    socket.on('recognize', function(data) {
        console.log('recognizing player')
        console.log(data);
    });

    socket.on('test', function() {
        console.log("test");
    });

    socket.on('disconnect', function () {
        console.log('a user disconnected');
        playerCount--;
    });
})