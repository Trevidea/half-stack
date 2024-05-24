import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
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
      // console.log(message)
      this.eventPreviewSubject.next(message);
    });
    this.socket.on("event-terminal", (message: string) => {
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

  _onLiveEvent(): Observable<Data.LiveEventConnectionDetail> {
    return this.liveEventSubject.pipe(
      map((data: any) => {
        const eventObject = JSON.parse(data);
        const liveEventConnectionDetail: Data.LiveEventConnectionDetail = eventObject.result[0][0];
        return new LiveEventDetailData(liveEventConnectionDetail);
      })
    );
  }

  // _onPreviewEvent(): Observable<Data.ConnectionPreview> {
  //   return this.onEventPreview().pipe(
  //     map((data) => {
  //       console.log(data)
  //       // const eventObject = JSON.parse(data);
  //       // const previewEventData: Data.ConnectionPreview = eventObject.result[0]?.[0]
  //       // console.log(previewEventData)
  //       // return new ConnectionPreviewData(previewEventData)
  //       return null
  //     })
  //   )
  // }


}
