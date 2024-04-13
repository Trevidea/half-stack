import { SocketHandler } from './socket-handler';
import { ZmqService } from './zmq-service';

export class ZmqMessageHandler {
  static async messageHandler() {
    while (true) {
      try {
        //       Receive a message
        const [topic, message] = await ZmqService.sock.receive();
        console.log(
          `Received message on topic ${topic.toString()}: ${message.toString()}`,
        );
        SocketHandler.connectSocket(topic, message);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
