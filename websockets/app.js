const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));

// Serve frontend
app.get('/', async (req, res) => {
  res.render('index');
});


// [START cloudrun_websockets_server]
// Initialize Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Set stores the socket id of every currently connected user
//Info is sent to client when they connect to sync user data
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
// [END cloudrun_websockets_server]

module.exports = server;
