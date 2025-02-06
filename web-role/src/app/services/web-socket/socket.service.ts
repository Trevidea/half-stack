// import { Injectable } from "@angular/core";
// import { environment } from "environments/environment";
// import { Observable, Subject } from "rxjs";
// import { map } from "rxjs/operators";
// import { Socket, io } from "socket.io-client";
// import { Data } from "./capture-interface";
// import { LiveEventDetailData } from "./live-event-detail";
// import { ConnectionPreviewData } from "./connection-preview";

// @Injectable({
//   providedIn: "root",
// })
// export class SocketService {
//   private socket!: Socket;
//   url = environment.spRelayUrl;
//   private liveEventSubject = new Subject<string>();
//   private eventPreviewSubject = new Subject<string>();
//   private eventTerminalSubject = new Subject<string>();

//   constructor() {
//     this.connectToRelayService();
//   }

//   connectToRelayService(): void {
//     this.socket = io(this.url);

//     this.socket.on("live-event", (message: string) => {
//       this.liveEventSubject.next(message);
//     });

//     this.socket.on("event-preview", (message: string) => {
//       // console.log(message)
//       this.eventPreviewSubject.next(message);
//     });
//     this.socket.on("event-terminal", (message: string) => {
//       // console.log(message)
//       this.eventTerminalSubject.next(message);
//     });
//   }

//   disconnectFromRelayService(): void {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   }

//   onLiveEvent(): Subject<string> {
//     return this.liveEventSubject;
//   }

//   onEventPreview(): Subject<string> {
//     return this.eventPreviewSubject;
//   }

//   onEventTerminal(): Subject<string> {
//     return this.eventTerminalSubject;
//   }

//   _onLiveEvent(): Observable<Data.LiveEventConnectionDetail> {
//     return this.liveEventSubject.pipe(
//       map((data: any) => {
//         const eventObject = JSON.parse(data);
//         const liveEventConnectionDetail: Data.LiveEventConnectionDetail = eventObject.result[0][0];
//         return new LiveEventDetailData(liveEventConnectionDetail);
//       })
//     );
//   }

//   // _onPreviewEvent(): Observable<Data.ConnectionPreview> {
//   //   return this.onEventPreview().pipe(
//   //     map((data) => {
//   //       console.log(data)
//   //       // const eventObject = JSON.parse(data);
//   //       // const previewEventData: Data.ConnectionPreview = eventObject.result[0]?.[0]
//   //       // console.log(previewEventData)
//   //       // return new ConnectionPreviewData(previewEventData)
//   //       return null
//   //     })
//   //   )
//   // }


// }

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly SERVER_URL = environment.spRelayUrl;

  constructor() {
    this.socket = io(this.SERVER_URL, {
      reconnection: true,
      reconnectionAttempts: Infinity, // Keep trying to reconnect forever
      reconnectionDelay: 1000, // Initial reconnection delay
      reconnectionDelayMax: 5000, // Maximum reconnection delay
      timeout: 20000 // Connection timeout
    });

    this.socket.on('connect_error', (err) => {
      console.error('Connection Error:', err);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Reconnection Failed');
    });
  }

  // Method to listen to specific topic messages
  public onTopicMessage(topic: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(topic, (data) => {
        observer.next(data);
      });

      return () => this.socket.off(topic); // Remove listener when unsubscribed
    });
  }
}


