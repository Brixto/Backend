var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('Hello');
});

http.listen(3000, function () {
    console.log('server listening to port 3000');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('message', function (msg) {
        io.emit('message', msg + '123');
        console.log(msg);
    })
})