import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { RangeEventPreviewView } from "./views/event-preview";
import { EventPreviewBuilder } from "./builders/event-preview";
import { Subscription } from "rxjs";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";

@Component({
  selector: "app-event-preview-presenter",
  template: `<app-event-preview [datasource]='previewData.result[0][0]'></app-event-preview>`,
  styleUrls: ["./event-preview.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventPreviewPresenter implements OnInit {
  previewData!: any;
  private subscription: Subscription;
  ds!: RangeEventPreviewView;
  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private dataFactoryService: DataFactoryService,
    private modelServiceService: ModelServiceService,
  ) {
    // this.socketService.onEventPreview().subscribe((data) => {
    //   this.previewData = data;
    //   console.log(data);
    //   console.log("from preview constructor", data);
    // });
    // this.ds = new RangeEventPreviewView();
  }

  ngOnInit(): void {
    console.log("Calling preview on service");
    this.modelServiceService.openPreview()

    this.subscription = this.socketService.onEventPreview().subscribe(
      (data) => {
        this.previewData = JSON.parse(data);
        console.log(data);
        console.log("from preview constructor", this.previewData);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
    console.log("from preview  this.previewData", this.previewData, this.subscription);
  }
}