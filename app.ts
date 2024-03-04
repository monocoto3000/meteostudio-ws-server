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

interface ApprovedPayment {
  name: string;
  concept: string;
  price: number;
}

io.on('connection', (socket: Socket) => {
  console.log("Error de conexion")
  socket.on('deliverData', (data: ApprovedPayment) => {
    console.log('Datos recibidos:', data);
    io.emit('newMessage', data);
  });
});

server.listen(4000, () => {
  console.log('Listening on port 4000');
});