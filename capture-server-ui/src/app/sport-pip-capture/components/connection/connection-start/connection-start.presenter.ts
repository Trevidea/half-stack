
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { LiveRangeView } from "./views/live-event";
import { LiveEventBuilder } from "./builders/live-event";
@Component({
  selector: "app-connection-start-presenter",
  template: '<app-connection-start></app-connection-start>',
  styleUrls: ["./connection-start.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ConnectionStartPresenter implements OnInit {
  ds!: LiveRangeView;
  constructor(private dataFactory: DataFactoryService) {
    this.ds = new LiveRangeView();
  }

  ngOnInit(): void {
    // Transformer.ComposeCollectionAsync(this.dataFactory.liveEventJson(), this.ds.liveView, LiveEventBuilder)
    // console.log(this.ds.liveView)
  }



}
