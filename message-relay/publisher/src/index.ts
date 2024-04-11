import * as zmq from 'zeromq';
import * as os from 'os';
import * as crypto from 'crypto';

// Define the port you want to use
const port: string = process.env.zmq_output || '4001';
// Define the connection type you want to use (tcp, ipc...)
const connectionType: string = process.env.connection_type || 'tcp';
// Define the host. Default is to publish on all.
const host: string = process.env.host || '*';
// Set the topic of the stream
const topicfilter: string = process.env.topic || 'rand';
const Publishport: string = `${connectionType}://${host}:${port}`;

// Create a ZeroMQ publisher socket
const socket: zmq.Publisher = new zmq.Publisher();
const subscriber: zmq.Subscriber = new zmq.Subscriber();
// Bind the socket to the Publishport
(async () => {
  await socket.bind(Publishport);
  console.log(`Sending on topic: ${topicfilter}`);
})();

// Function to send a random number every second
setInterval(() => {
  // Create a random number
  const msg = { num: 'abc' + crypto.randomInt(0, 10) };
  // Send this message
  socket.send([topicfilter, JSON.stringify(msg)]);
}, 1000);
