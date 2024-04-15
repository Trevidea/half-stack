import { Server } from 'socket.io';
import http from 'http';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4200',
  },
});
httpServer.listen(3001);
console.log('Relay service running on port 3001');

async function run() {
  const zmq = require('zeromq');
  const sock = new zmq.Subscriber();

  sock.connect('tcp://127.0.0.1:4001');
  sock.subscribe('event-terminal');
  sock.subscribe('event-preview');
  sock.subscribe('live-event');
  console.log('Subscriber connected to port 4001');

  for await (const [topic, msg] of sock) {
    console.log('Topic:', topic.toString(), 'message:', msg.toString());
    io.emit(topic.toString(), msg.toString());
  }
}

run();
