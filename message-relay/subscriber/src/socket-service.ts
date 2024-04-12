import { Server } from 'socket.io';

export class Socket {
  // public static io: any;
  public static io: Server;

  static initSocket(server: any) {
    Socket.io = require('socket.io')(server, {
      cors: {
        origin: '*',
      },
    });
    return Socket.io;
  }
}
