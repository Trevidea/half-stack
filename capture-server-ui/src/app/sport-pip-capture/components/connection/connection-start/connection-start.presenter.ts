
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { LiveRangeView, liveEventDetail } from "./views/live-event";
import { LiveEventBuilder } from "./builders/live-event";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { EventConnection$ } from "../connection-data";
@Component({
  selector: "app-connection-start-presenter",
  template: `<app-connection-start [datasource]="ds"></app-connection-start>`,
  styleUrls: ["./connection-start.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionStartPresenter implements OnInit {
  ds!: liveEventDetail;
  liveEventData: any[] = []
  constructor(private dataFactory: DataFactoryService,
    private socketService: SocketService,
  ) {
    this.ds = new liveEventDetail();
  }

  ngOnInit(): void {

    Transformer._ComposeLiveObjectAsync(this.socketService._onLiveEvent(), this.ds, LiveEventBuilder)
    console.log("liveEventData", this.ds)
  }



}
