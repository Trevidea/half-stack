import { Server } from 'socket.io';
import http from 'http';

<<<<<<< HEAD
const app = express();
const server = app.listen(5001, () => {
  console.log('running 5001');
=======
const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
>>>>>>> bf33f2aac24836ed0185bc5aac07b7b7bacdf180
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
    io.on('connection', () => {
      io.emit(topic.toString(), msg.toString());
    });
  }
}

run();
