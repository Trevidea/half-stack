import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { liveEventDetail } from "./views/live-event";
import { LiveEventBuilder } from "./builders/live-event";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { LiveEventDetailData } from "app/sport-pip-capture/models/live-event-detail";
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
  liveEventData: any[] = [];
  constructor(
    private dataFactory: DataFactoryService,
    private socketService: SocketService
  ) {
    this.ds = new liveEventDetail();
    this.socketDs = new liveEventDetail();
  }

  ngOnInit(): void {
    Transformer._ComposeLiveObjectAsync(
      this.socketService._onLiveEvent("all"),
      this.socketDs,
      LiveEventBuilder
    );
    this.ds = this.socketDs;
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
}
