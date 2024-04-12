import express from 'express';
import * as core from 'express-serve-static-core';
export class Server {
  public app: core.Application = express();

  init() {
    // connection with cpp server
  }
}
