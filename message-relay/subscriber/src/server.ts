import express from 'express';
import * as core from 'express-serve-static-core';
import { Socket } from './socket-service';
import { myServer } from './index';
export class Server {
  public app: core.Application = express();

  init() {
    // connection with cpp server
    this.setConfig();
  }
  setConfig() {
    console.log('cpp values');
    Socket.initSocket(myServer);
  }
}
