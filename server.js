var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shortid = require('shortid');

http.listen(process.env.PORT || 3000, function () {
    console.log('server listening to port 3000');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var playerCount = 0;
var playerId;

io.on('connection', function (socket) {
    console.log('a user connected');
    playerId = shortid.generate();

    socket.emit("register", { id: playerId });

    playerCount++;

    for (var i = 0; i < playerCount; i++) {
        console.log('sending spawn to player');
        socket.emit('spawn');
    }

    socket.broadcast.emit('spawn');

    socket.on('recognize', function(data) {
        console.log('recognizing player')
        console.log(data);

        // TODO: check id in mongodb and try to load user
    });

    socket.on('move', function(data) {
        console.log('move ' + data.d.x);
        data.id = playerId;
        delete data.c;
        
        data.x = data.d.x;
        data.y = data.d.y;
        
        delete data.d;
        socket.broadcast.emit('move', data);
    });

    socket.on('test', function() {
        console.log("test");
    });

    socket.on('disconnect', function () {
        console.log('a user disconnected');
        playerCount--;
    });
})