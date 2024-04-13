import { Server } from './zmq-socket-service-handler/server';
import { Server as I_http } from 'http';
const server = new Server();

const app = server.app;

export const myServer: I_http = app.listen(5000, () => {
  server.init();
  console.log('running 5000');
});
