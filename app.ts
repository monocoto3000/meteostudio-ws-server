import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { EventsSocket } from "./entities/eventTypes";

const app = express();

app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 5000);

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido");
});

app.use("*", (req, res) => {
  res.send("Ruta inexistente");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

io.on(EventsSocket.CONNECTION, (socket) => {
  
  socket.on(EventsSocket.SEND_PAYMENTCONFIRMATION, (data: any) => {
    console.log(data)
    io.emit(EventsSocket.GET_PAYMENT, data);
  });
});

server.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});