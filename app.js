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
    console.log('Cliente WebSocket conectado');
    socket.on('rtdata', function (data) {
        console.log('Datos de rtdata recibidos:', data);
        io.emit('rtdata', data);
    });
    socket.on('averages', function (data) {
        console.log('Datos de averages recibidos:', data);
        io.emit('averages', data);
    });
});
server.listen(4000, function () {
    console.log('Servidor WebSocket escuchando en el puerto 4000');
});
