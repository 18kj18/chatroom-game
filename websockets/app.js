import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
const app = express();
app.use(express.static(__dirname + '/public'));

// Serve frontend
app.get('/', async (req, res) => {
  res.render('index');
});

import admin from "firebase-admin";
import serviceAccount from "./key.json" with {type: 'json'};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://catroom-2a37a-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();

//This writes to the database
//db.collection("test").doc("test user").set({ name: "tester" });

// [START cloudrun_websockets_server]
// Initialize Socket.io
import { Server } from "socket.io";
import { createServer } from "http";
const server = createServer(app);
const io = new Server(server);

//Set stores the socket id of every currently connected user
//Info is sent to client when they connect to sync user data
let users = new Map();
//!users.has(socket.id) to check if the user is connected correctly. avoids crashes

io.on('connection', (socket) => {
    socket.on('user connect', (username, position, printmessage) => {
        socket.name = username;

        //If player has a stored position in the database, set their position to that position
        db.collection("position").doc(socket.name).get().then((doc) => {
            if (doc.exists) {
                position = doc.data().pos;
            } else {
                position = position;
            }

            io.emit('user connect', username, position, true);

            //When user connects, have all other client's info be sent to them
            users.forEach( (i) => {
                io.to(socket.id).emit('user connect', i.name, i.position, false);
            });

            //Add new socket to list of connected sockets
            users.set(socket.id, {name: username, position: position});
        });
    });

    socket.on('send message', (message, username) => {
        if (!users.has(socket.id)) { return; }
        io.emit('send message', message, username);
    });

    socket.on('move player', (username, position) => {
        if (!users.has(socket.id)) { return; }
        //socket.position = position;
        users.set(socket.id, {name: users.get(socket.id).name, position: position})
        io.emit('move player', username, position);
    });

    socket.on('disconnect', () => {
        if (!users.has(socket.id)) { return; }
        //Write player's last known position to database
        try {
            db.collection("position").doc(socket.name).set({ pos: users.get(socket.id).position});
        } catch (err) {
            console.error("Failed to save position: ", err);
        }

        io.emit("remove player", socket.name);
        users.delete(socket.id);
    });
});
// [END cloudrun_websockets_server]

//module.exports = server;
export { server };