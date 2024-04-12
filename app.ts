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
    
  interface Data {
    station_id: string;
    temperature: number;
    humidity: number;
    radiation: number;
  }

  io.on('connection', (socket: Socket) => {
    console.log("Cliente conectado")
    socket.on('deliverData', (data: Data) => {
      console.log('Datos recibidos:', data);
      io.emit('newMessage', data);
    });
  });

  server.listen(4000, () => {
    console.log('Listening on port 4000');
  });