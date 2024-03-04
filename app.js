"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket_io_1 = require("socket.io");
var cors = require("cors");
var app = express();
app.use(cors());
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', function (socket) {
    console.log("Error de conexion");
    socket.on('deliverData', function (data) {
        console.log('Datos recibidos en el servidor:', data);
        io.emit('newMessage', data);
    });
});
server.listen(4000, function () {
    console.log('Listening on port 4000');
});
