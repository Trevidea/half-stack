import express from 'express';
import * as core from 'express-serve-static-core';
import { SocketService } from './socket-service';
import { myServer } from '../index';
import { SocketHandler } from './socket-handler';
import { ZmqService } from './zmq-service';
import { ZmqMessageHandler } from './zmq-message-handler';
export class Server {
  public app: core.Application = express();

  init() {
    // connection with cpp server
    ZmqService.connectionZmq();
    this.setConfig();
  }
  async setConfig() {
    console.log('cpp values');
    await SocketService.initSocket(myServer);
    ZmqMessageHandler.messageHandler();
  }
}
