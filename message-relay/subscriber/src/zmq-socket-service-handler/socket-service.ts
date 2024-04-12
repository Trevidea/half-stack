import * as Socket from 'socket.io';
import { Server } from './server';
import { Server as I_http } from 'http';

export class SocketService {
  // public static io: any;
  public static io: Socket.Socket;

  static initSocket(server: I_http) {
    SocketService.io = require('socket.io')(server, {
      cors: {
        origin: '*',
      },
    });
    return SocketService.io;
  }
}
