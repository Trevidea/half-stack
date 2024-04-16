import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
<<<<<<< HEAD
  socket!: Socket;
  url = 'ws://localhost:5001';
=======
  private socket!: Socket;
  url = 'http://drake.in:3001';

  private liveEventSubject = new Subject<string>();
  private eventPreviewSubject = new Subject<string>();
  private eventTerminalSubject = new Subject<string>();
>>>>>>> bf33f2aac24836ed0185bc5aac07b7b7bacdf180

  constructor() {
  }

  connectToRelayService(): void {
    console.log("connectToRelayService called")
    this.socket = io(this.url);
    
    this.socket.on('live-event', (message: string) => {
      console.log(message)
      this.liveEventSubject.next(message);
    });

    this.socket.on('event-preview', (message: string) => {
      console.log(message)
      this.eventPreviewSubject.next(message);
    });
    this.socket.on('event-terminal', (message: string) => {
      console.log(message)
      this.eventTerminalSubject.next(message);
    });
  }

  disconnectFromRelayService(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  
  onLiveEvent(): Subject<string> {
    return this.liveEventSubject;
  }

  onEventPreview(): Subject<string> {
    return this.eventPreviewSubject;
  }

  onEventTerminal(): Subject<string> {
    return this.eventTerminalSubject;
  }
}
