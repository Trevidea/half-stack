import { Server } from './zmq-socket-service-handler/server';
import { Server as Http } from 'http';
const server = new Server();

const app = server.app;

export const myServer: Http = app.listen(5000, () => {
  server.init();
  console.log('running 5000');
});
