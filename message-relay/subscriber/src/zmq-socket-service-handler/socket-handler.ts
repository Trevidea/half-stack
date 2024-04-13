import { SocketService } from './socket-service';
import { ZmqMessageHandler } from './zmq-message-handler';

export class SocketHandler {
  static connectSocket(topic: any, message: any) {
    SocketService.io.on('connection', (socket: any) => {
      SocketService.io.emit('event', `${message.toString()}`);
    });
  }
}
