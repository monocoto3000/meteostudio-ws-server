import { Server, Socket } from 'socket.io';

export class WebSocketHandler {
  private packetBuffer: any[] = [];
  private isProcessing = false;

  constructor(private io: Server) {
    this.io.on('connection', this.handleConnection);
  }

  private handleConnection = (socket: Socket) => {
    console.log('Cliente WebSocket conectado');

    socket.on('rtdata', (data) => {
      this.enqueuePacket({ event: 'rtdata', data });
      this.processNextPacket();
    });

    socket.on('averages', (data) => {
      this.enqueuePacket({ event: 'averages', data });
      this.processNextPacket();
    });
  };

  private enqueuePacket(packet: any) {
    this.packetBuffer.push(packet);
  }

  private processNextPacket() {
    if (this.packetBuffer.length > 0 && !this.isProcessing) {
      this.isProcessing = true;
      const packet = this.packetBuffer.shift();
      this.handlePacket(packet);
    }
  }

  private handlePacket(packet: any) {
    const { event, data } = packet;
    console.log(`Procesando evento ${event} con datos:`, data);
    this.io.emit(event, data); 
    this.isProcessing = false;
    this.processNextPacket(); 
  }
}
