"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket_io_1 = require("socket.io");
var routes_1 = require("./src/routes/routes");
var socket_handler_1 = require("./src/handler/socket.handler");
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
app.use('/api', routes_1.default);
var websocketHandler = new socket_handler_1.WebSocketHandler(io);
var PORT = 4000;
server.listen(PORT, function () {
    console.log("Servidor WebSocket escuchando en el puerto ".concat(PORT));
});
