
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { LiveRangeView } from "./views/live-event";
import { LiveEventBuilder } from "./builders/live-event";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
@Component({
  selector: "app-connection-start-presenter",
  template: `<app-connection-start [liveEventData]='liveEventData'></app-connection-start>`,
  styleUrls: ["./connection-start.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionStartPresenter implements OnInit {
  ds!: LiveRangeView;
  liveEventData:any
  constructor(private dataFactory: DataFactoryService,
    private socketService: SocketService,
  ) {
    this.ds = new LiveRangeView();
  }

  ngOnInit(): void {

    this.socketService.onLiveEvent().subscribe(
      (data:any)=>{
        const eventObject=JSON.parse(data);
        this.liveEventData =eventObject.result[0][0];
        console.log("liveEventData",this.liveEventData)
        // const eventObject = this.liveEventData.result[0][0];
        // console.log("Event Object:", eventObject);
      }
    )
    // Transformer.ComposeCollectionAsync(this.dataFactory.liveEventJson(), this.ds.liveView, LiveEventBuilder)
    // console.log(this.ds.liveView)
  }



}
