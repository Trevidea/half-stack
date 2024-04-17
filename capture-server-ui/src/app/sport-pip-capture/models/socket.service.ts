import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  url = environment.spRelayUrl;

  private liveEventSubject = new Subject<string>();
  private eventPreviewSubject = new Subject<string>();
  private eventTerminalSubject = new Subject<string>();

  constructor() {
    // this.connectToRelayService();
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
