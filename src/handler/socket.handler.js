"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketHandler = void 0;
var WebSocketHandler = /** @class */ (function () {
    function WebSocketHandler(io) {
        var _this = this;
        this.io = io;
        this.packetBuffer = [];
        this.isProcessing = false;
        this.handleConnection = function (socket) {
            console.log('Cliente WebSocket conectado');
            socket.on('rtdata', function (data) {
                _this.enqueuePacket({ event: 'rtdata', data: data });
                _this.processNextPacket();
            });
            socket.on('averages', function (data) {
                _this.enqueuePacket({ event: 'averages', data: data });
                _this.processNextPacket();
            });
        };
        this.io.on('connection', this.handleConnection);
    }
    WebSocketHandler.prototype.enqueuePacket = function (packet) {
        this.packetBuffer.push(packet);
    };
    WebSocketHandler.prototype.processNextPacket = function () {
        if (this.packetBuffer.length > 0 && !this.isProcessing) {
            this.isProcessing = true;
            var packet = this.packetBuffer.shift();
            this.handlePacket(packet);
        }
    };
    WebSocketHandler.prototype.handlePacket = function (packet) {
        var event = packet.event, data = packet.data;
        console.log("Procesando evento ".concat(event, " con datos:"), data);
        this.io.emit(event, data);
        this.isProcessing = false;
        this.processNextPacket();
    };
    return WebSocketHandler;
}());
exports.WebSocketHandler = WebSocketHandler;
