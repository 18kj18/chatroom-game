const express = require('express');
const app = express();
const { Server } = require('socket.io');
const server = require('http').createServer(app);
const io = new Server(server);
const port = 8081;

app.use(express.static("js"));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('user connect', (username) => {
        io.emit('user connect', (username));
    });

    socket.on('send message', (message, username) => {
        io.emit('send message', message, username);
    });
});

server.listen(port,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

