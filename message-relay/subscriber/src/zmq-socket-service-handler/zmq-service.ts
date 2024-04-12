import * as zmq from 'zeromq';
export class ZmqService {
  public static sock = new zmq.Subscriber();
  static connectionZmq() {
    ZmqService.sock.connect('tcp://127.0.0.1:4001');
    ZmqService.sock.subscribe('event');
    console.log('ZMQ sub connected to port 4000');
    return ZmqService.sock;
  }
}
