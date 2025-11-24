let socket = io();

window.addEventListener("DOMContentLoaded", (event) => {
    let usernameform = document.getElementById('usernameform');
    let messageform = document.getElementById('messageform');
    let usernamefield = document.getElementById('username');
    let message = document.getElementById('message');
    let messageArea = document.getElementById("messageArea");

    let username = "";

    console.log("Is this thing on?");

    usernameform.addEventListener("submit", (e) => {
        e.preventDefault();
        if (usernamefield.value) {
            username = usernamefield.value;
            socket.emit('user connect', username);
            usernameform.style.display = "none";
            messageform.style.display = "block";
        }
    });

    messageform.addEventListener("submit", (e) => {
        e.preventDefault();
        if (username != "") {
            socket.emit('send message', message.value, username);
            message.value = "";
        }
    });
});

socket.on("user connect", (username) => {
    let name = document.createElement("p");
    name.style.backgroundColor = "grey";
    name.style.width = "100%";
    name.style.textAlign = "center";
    name.style.color = "white";
    name.textContent = username + " has connected! Say hi!";
    messageArea.appendChild(name);
});

socket.on("send message", (message, username) => {
    let chatContent = document.createElement("p");
    chatContent.textContent = username + ": " + message;
    messageArea.appendChild(chatContent);
});