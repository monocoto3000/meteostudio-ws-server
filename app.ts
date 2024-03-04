import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.on('getData', (data) => {
        console.log('Datos recibidos:', data);
        io.emit('nuevoDato', data);
    });
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
