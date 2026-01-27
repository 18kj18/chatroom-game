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

//Set stores the socket id of every currently connected user
let users = new Map();

io.on('connection', (socket) => {
    socket.on('user connect', (username, position, printmessage) => {
        socket.name = username;
        socket.position = position;
        io.emit('user connect', username, position, true);

        //When user connects, have all other client's info be sent to them
        users.forEach( (i) => {
            console.log("to "+socket.id+" containing "+i.name+" "+i.position);
            io.to(socket.id).emit('user connect', i.name, i.position, false);
        });

        //Add new socket to list of connected sockets
        users.set(socket.id, {name: username, position: position});
    });

    socket.on('send message', (message, username) => {
        io.emit('send message', message, username);
    });

    socket.on('move player', (username, position) => {
        //socket.position = position;
        users.set(socket.id, {name: users.get(socket.id).name, position: position})
        io.emit('move player', username, position);
    });

    socket.on('disconnect', () => {
        io.emit("remove player", socket.name);
        users.delete(socket.id);
    });
});

server.listen(port,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

//Every 10 seconds, ping all clients. those who dont respond get disconnected
async function ping() {
    console.log(users);
    setTimeout(ping, 5000);
}
ping();
