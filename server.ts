import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import router from './src/routes/routes';
import { WebSocketHandler } from './src/handler/socket.handler';
import { socketioAuthMiddleware } from './src/middlewares/auth.middleware';
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

app.use('/api', router);

io.use(socketioAuthMiddleware);

const websocketHandler = new WebSocketHandler(io);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});
