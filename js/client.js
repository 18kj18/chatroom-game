let socket = io();

let local_username= "";
let local_position = "";
let connected = false;

window.addEventListener("DOMContentLoaded", (event) => {
    let usernameform = document.getElementById('usernameform');
    let messageform = document.getElementById('messageform');
    let usernamefield = document.getElementById('username');
    let message = document.getElementById('message');
    let messageArea = document.getElementById("messageArea");

    console.log("Is this thing on?");

    usernameform.addEventListener("submit", (e) => {
        e.preventDefault();
        if (usernamefield.value) {
            connected = true;
            local_username = usernamefield.value;
            //local_position = parseInt(document.getElementById("local-player").style.left);
            socket.emit('user connect', local_username, 500, true);
            usernameform.style.display = "none";
            messageform.style.display = "block";
        }
    });

    messageform.addEventListener("submit", (e) => {
        e.preventDefault();
        if (local_username != "") {
            socket.emit('send message', message.value, local_username);
            message.value = "";
        }
    });
});

socket.on("user connect", (username, position, printmessage) => {
    if (!connected) {return};

    //If printmessage is false, dont print a join message for the user
    if (printmessage) {
        let name = document.createElement("p");
        name.style.backgroundColor = "grey";
        name.style.width = "100%";
        name.style.textAlign = "center";
        name.style.color = "white";
        name.textContent = username + " has connected! Say hi!";
        messageArea.appendChild(name);
    }
    
    //Create player
    let playerdiv = document.createElement("div");
    playerdiv.id = username;
    document.getElementById("footer").appendChild(playerdiv);

    let nametag = document.createElement("p");
    nametag.innerText = username;
    playerdiv.appendChild(nametag);

    let newplayer = document.createElement("img");
    playerdiv.style.position = "absolute";
    playerdiv.style.left = position + "px";
    newplayer.style.height = 200 + "px";
    newplayer.src = "./cat.jpg";
    //newplayer.id = username;
    playerdiv.appendChild(newplayer);
    //document.getElementById("footer").appendChild(newplayer);

    window.addEventListener("onunload", (e) => {
        e.preventDefault();
        socket.disconnect();
    });

    window.onunload = () => {return null};
      
});

socket.on("send message", (message, username) => {
    let chatContent = document.createElement("p");
    chatContent.textContent = username + ": " + message;
    messageArea.appendChild(chatContent);
});

socket.on("move player", (username, position) => {
    if (username != local_username) {
        document.getElementById(username).style.left = position+"px";
    }
});

socket.on("remove player", (username) => {
    document.getElementById(username).remove();
    let name = document.createElement("p");
    name.style.backgroundColor = "grey";
    name.style.width = "100%";
    name.style.textAlign = "center";
    name.style.color = "white";
    name.textContent = username + " has disconnected! :c";
    messageArea.appendChild(name);
});

//Move image on keypress
document.addEventListener('keydown', (e) => {
    if (e.key == "a") {
        document.getElementById(local_username).style.left = (parseInt(document.getElementById(local_username).style.left) - 20) + "px";
        socket.emit("move player", local_username, parseInt(document.getElementById(local_username).style.left));
    }

    if (e.key == "d") {
        document.getElementById(local_username).style.left = (parseInt(document.getElementById(local_username).style.left) + 20) + "px";
        socket.emit("move player", local_username, parseInt(document.getElementById(local_username).style.left));
    }
});
