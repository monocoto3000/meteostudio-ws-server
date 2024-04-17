import * as express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import * as cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket: Socket) => {
  console.log('Cliente WebSocket conectado');

  socket.on('rtdata', (data) => {
    console.log('Datos de rtdata recibidos:', data);
    io.emit('rtdata', data);
  });

  socket.on('averages', (data) => {
    console.log('Datos de averages recibidos:', data);
    io.emit('averages', data);
  });
});

server.listen(4000, () => {
  console.log('Servidor WebSocket escuchando en el puerto 4000');
});