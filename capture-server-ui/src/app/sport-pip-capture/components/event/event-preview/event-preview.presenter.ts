import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { RangeEventPreviewView } from "./views/event-preview";
import { EventPreviewBuilder } from "./builders/event-preview";

@Component({
  selector: "app-event-preview-presenter",
  template:
    "<app-event-preview [datasource]='previewData'></app-event-preview>",
  styleUrls: ["./event-preview.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventPreviewPresenter implements OnInit {
  previewData!: any;
  ds!: RangeEventPreviewView;
  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private dataFactoryService: DataFactoryService
  ) {
    this.socketService.listen("event").subscribe((data) => {
      this.previewData = data;
      console.log(data);
    });
    this.ds = new RangeEventPreviewView();
  }

  ngOnInit(): void {
    console.log("from preview component");
    Transformer.ComposeCollectionAsync(
      this.dataFactoryService.eventPreviewJson(),
      this.ds.eventPreview,
      EventPreviewBuilder
    );

    // this.route.queryParams.subscribe(params => {
    //   this.previewData = JSON.parse(params['item']);
    // });
    // console.log(this.previewData)
  }
}
