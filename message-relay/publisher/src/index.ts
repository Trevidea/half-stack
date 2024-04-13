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
const topicfilter: string = process.env.topic || 'event';
const Publishport: string = `${connectionType}://${host}:${port}`;

// Create a ZeroMQ publisher socket
const socket: zmq.Publisher = new zmq.Publisher();
const subscriber: zmq.Subscriber = new zmq.Subscriber();
// Bind the socket to the Publishport
(async () => {
  await socket.bind(Publishport);
  console.log(`Sending on topic: ${topicfilter}`);
})();

function sendEvent() {
  const startEvent = {
    id: 1,
    dtEvent: '2024-12-04',
    level: 'Diversity',
    program: 'Man',
    sport: 'Cricket',
    status: 'OK',
    title: 'CSK Vs MI',
    detail: {
      cityAddress: 'Mohali',
      streetAddress: '12 Kb 18',
      type: 'On Demand Event',
    },
    year: 2024,
    venue: {
      location: 'b24,vikas nagar Ludhiana',
    },
    time: 1211,
    type: 'On Demand Event',
    countdown: '111',
    activeDevice: [
      { id: 1, deviceName: 'oppo hand cam' },
      { id: 2, deviceName: 'iphone 15 Max pro' },
    ],
  };
  socket.send([topicfilter, JSON.stringify(startEvent)]);
}
setInterval(() => {
  setTimeout(() => {
    sendEvent();
    setTimeout(() => {
      const msg = { eventStatus: 'Event Stopped' };
      socket.send([topicfilter, JSON.stringify(msg)]);
    }, 1000);
    setTimeout(() => {
      const preview = { eventStatus: 'Event Ready for Preview' };
      socket.send([topicfilter, JSON.stringify(preview)]);
    }, 2000);
  }, 3000);
}, 5000);
