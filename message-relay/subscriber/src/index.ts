import * as zmq from 'zeromq';
import express from 'express';
import { Server } from './server';

const server = new Server();

const app = server.app;

const myServer = app.listen(5000, () => {
  console.log('running 5000');
});

const io = require('socket.io')(myServer, {
  cors: { origin: '*' },
});
myServer.setMaxListeners(15);

const sock = new zmq.Subscriber();
const publisher = new zmq.Publisher();
// Connect to the ZeroMQ socket
sock.connect('tcp://127.0.0.1:4001');

// Subscribe to a topic
sock.subscribe('event');

// Log a message indicating successful connection
console.log('ZMQ sub connected to port 4000');

// Function to handle incoming messages
async function handleMessage() {
  while (true) {
    try {
      // Receive a message
      const [topic, message] = await sock.receive();

      // Convert the message to a string and log it
      console.log(
        `Received message on topic ${topic.toString()}: ${message.toString()}`,
      );

      io.on('connection', (socket: any) => {
        console.log('connection with socket');
        io.emit('hello', `${message.toString()}`);
        socket.on('message', (data: any) => {
          console.log(data);
          publisher.send(['response-topic', data]);
        });
      });
    } catch (err) {
      console.error('Error receiving message:', err);
    }
  }
}

// Start handling incoming messages
handleMessage().catch((err) => console.error('Error handling messages:', err));
