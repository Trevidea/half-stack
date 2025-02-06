import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import * as zmq from 'zeromq';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

app.use(cors());

const connectZmq = async (sock: zmq.Subscriber) => {
  try {
    sock.connect("tcp://service-gateway:4001");
    sock.subscribe("event-terminal");
    sock.subscribe("event-preview");
    sock.subscribe("live-event");
    sock.subscribe("event-device");
    console.log('Connected to ZeroMQ publisher');
  } catch (err) {
    console.error('ZeroMQ connection error:', err);
    setTimeout(() => connectZmq(sock), 5000); // Retry connection every 5 seconds
  }
};

const startZmqSubscriber = async () => {
  const sock = new zmq.Subscriber();
  connectZmq(sock);

  // Infinite loop to receive messages from ZeroMQ
  (async () => {
    for await (const [topic, message] of sock) {
      const topicStr = topic.toString();
      const messageStr = message.toString();
      console.log(`Received message: ${topicStr} - ${messageStr}`);

      // Relay the message to connected Socket.IO clients
      io.emit(topicStr, { topic: topicStr, data: messageStr });
    }
  })().catch(err => {
    console.error('ZeroMQ subscriber loop error:', err);
    sock.close(); // Close the socket on error
    setTimeout(startZmqSubscriber, 5000); // Restart the subscription loop after a delay
  });
};

startZmqSubscriber();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
