export class Socket {
  public static io: any;

  static initSocket(server: any) {
    Socket.io = require('socket.io')(server, {
      cors: {
        origin: '*',
      },
    });
    return Socket.io;
  }
}
