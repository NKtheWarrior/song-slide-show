const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
let string
io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("chat message", (message) => {
        console.log("message: ", message);
        if (message.startsWith("text:")) {
            string = message.split(":")[1];
            io.emit("chat message", string);
        }
        if (message === "sync") {
            io.emit("chat message", string);
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3001, () => {
    console.log("Socket.io server listening on *:3001");
});
