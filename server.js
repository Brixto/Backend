var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 3000, function () {
    console.log('server listening to port 3000');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('message', function (msg) {
        io.emit('message', msg + '123');
        console.log(msg);
    })
})