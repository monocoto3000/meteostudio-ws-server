import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

interface ApprovedPayment {
  name: string;
  concept: string;
  price: number;
}

io.on('connection', (socket: Socket) => {
  socket.on('deliverData', (data: ApprovedPayment) => {
    console.log(data);
    io.emit('newMessage', data);
  });
});

server.listen(4000, () => {
  console.log('Listening on port 4000');
});