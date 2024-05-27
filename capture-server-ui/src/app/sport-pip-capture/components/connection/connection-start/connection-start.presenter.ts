import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ConnectionDetailsView, liveEventDetail } from "./views/live-event";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-connection-start-presenter",
  template: `<app-connection-start
    [datasource]="ds"
    (pubSubAll)="ListType($event)"
  ></app-connection-start>`,
  styleUrls: ["./connection-start.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class ConnectionStartPresenter implements OnInit {
  ds!: liveEventDetail;
  socketDs!: liveEventDetail;
  private socketSubscription: Subscription;
  constructor(
    private socketService: SocketService
  ) {
    this.ds = new liveEventDetail();
    this.socketDs = new liveEventDetail();
  }

  ngOnInit(): void {
    //TODO:SOCKET.IO.ERROR
    // Transformer._ComposeLiveObjectAsync(
    //   this.socketService._onLiveEvent(),
    //   this.socketDs,
    //   LiveEventBuilder
    // );
    this.ds = this.socketDs;
    this.socketSubscription = this.socketService.onTopicMessage('live-event').subscribe((message) => {
      console.log("live data ", message)
      // const data: any = JSON.parse(message["data"]);
      // const liveEventData: any = data.result[0][0];
      // console.log(liveEventData)
      // this.ds.title = liveEventData["title"];
      // this.ds.level = liveEventData["level"];
      // this.ds.dtEvent = liveEventData["dtEvent"];
      // this.ds.program = liveEventData["program"];
      // this.ds.sport = liveEventData["sport"];
      // this.ds.status = liveEventData["status"];
      // this.ds.time = liveEventData["time"];
      // this.ds.type = liveEventData["type"];
      // this.ds.venue = liveEventData["venue"];
      // this.ds.detail = liveEventData["detail"];
      // this.ds.connectionDetails.Clear()
      // liveEventData["connectionDetails"]?.forEach(element => {
      //   var connectionDetails: ConnectionDetailsView = new ConnectionDetailsView();
      //   connectionDetails.device = element["device"];
      //   connectionDetails.ipAddress = element["ipAddress"];
      //   connectionDetails.role = element["role"];
      //   connectionDetails.name = element["name"];
      //   connectionDetails.quality = element["quality"];
      //   connectionDetails.received = element["filesReceived"];
      //   connectionDetails.retries = element["retries"];
      //   connectionDetails.location = element["location"];
      //   connectionDetails.network = element["network"];
      //   connectionDetails.transmitStatus = element["transmitStatus"];
      //   connectionDetails.id = element["id"];
      //   this.ds.connectionDetails.Add(connectionDetails);
      // });

    });

  }
  ListType(e: any) {
    this.ds = this.socketDs;
    let type = e;
    if (e == "sub") {
      type = "Subscriber";
    } else if (e == "pub") {
      type = "Publisher";
    } else if (e == "all") {
      type = "all";
      this.ds = this.socketDs;
      return this.ds;
    }
    const liveEventDetail = {
      title: this.ds.title,
      countdown: this.ds.countdown,
      dtEvent: this.ds.dtEvent,
      ongoingCountdown: this.ds.ongoingCountdown,
      time: this.ds.time,

      connectionDetails: this.ds.connectionDetails.filter((connection) => {
        return connection.role === type;
      }),
    };
    this.ds = liveEventDetail as any;
    return this.ds;
  }

  // ngOnDestroy(): void {
  //   if (this.socketSubscription) {
  //     console.log("Socket unsubscribed..")
  //     this.socketSubscription.unsubscribe();
  //   }
  // }
}
