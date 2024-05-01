import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, Subject, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Socket, io } from "socket.io-client";
import { Data } from "./capture-interface";
import { LiveEventDetailData } from "./live-event-detail";
import { ConnectionPreviewData } from "./connection-preview";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket!: Socket;
  url = environment.spRelayUrl;
  // url = "http://localhost:3001";
  private liveEventSubject = new Subject<string>();
  private eventPreviewSubject = new Subject<string>();
  private eventTerminalSubject = new Subject<string>();

  constructor() {
    this.connectToRelayService();
  }

  connectToRelayService(): void {
    this.socket = io(this.url);

    this.socket.on("live-event", (message: string) => {
      this.liveEventSubject.next(message);
    });

    this.socket.on("event-preview", (message: string) => {
      this.eventPreviewSubject.next(message);
    });
    this.socket.on("event-terminal", (message: string) => {
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

  _onLiveEvent(): Observable<Data.LiveEventConnectionDetail> {
    return this.liveEventSubject.pipe(
      map((data: any) => {
        const eventObject = JSON.parse(data);
        const liveEventConnectionDetail: Data.LiveEventConnectionDetail = eventObject.result[0][0];
        return new LiveEventDetailData(liveEventConnectionDetail);
      })
    );
  }




  _onEventPreview(): Observable<Data.ConnectionPreview> {
    return this.eventPreviewSubject.pipe(
      map((data: any) => {
        // data is already in json
        const previewData = data;
        console.log(previewData);
        const previewDetail: Data.ConnectionPreview = previewData.result[0][0];
        console.log("previewDetail:", previewDetail); // Log inside the map function
        return new ConnectionPreviewData(previewDetail);
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(null);
      })
    );
  }

}
