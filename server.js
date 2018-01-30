var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var matchmaking = require('./matchmaking.js');
var shortid = require('shortid');

http.listen(process.env.PORT || 3000, function () {
    console.log('server listening to port 3000');
});

app.use(express.static(__dirname + '/royale'));

var players = [];

io.on('connection', function (socket) {

    var playerId = shortid.generate();
    console.log('a user connected ' + playerId);

    var player = {
        id: playerId,
        rank: 10
    };

    players[playerId] = player;
    matchmaking.queueForGame(player);

    socket.emit('register', { id: playerId });
    socket.broadcast.emit('spawn', { id: playerId });
    for (var id in players) {
        if (id !== playerId) {
            socket.emit('spawn', { id: id });
        }
    }

    socket.on('recognize', function (data) {
        console.log('recognizing player')
        console.log(data);

        // TODO: check id in mongodb and try to load user
    });

    socket.on('move', function (data) {
        data.id = playerId;
        delete data.c;

        data.x = data.d.x;
        data.y = data.d.y;

        delete data.d;
        socket.broadcast.emit('move', data);
    });

    socket.on('test', function () {
        console.log("test");
    });

    socket.on('disconnect', function () {
        console.log('a user disconnected');
        delete players[playerId];
        socket.broadcast.emit('disconnected', { id: playerId });
    });
})