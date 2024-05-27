declare module "zeromq" {
    export class Subscriber {
      connect(address: string): void;
      subscribe(topic: string): void;
      [Symbol.asyncIterator](): AsyncIterator<[Buffer, Buffer]>;
    }
  }
  