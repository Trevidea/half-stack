import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { EventPreview, RangeEventPreviewView } from "./views/event-preview";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { Transformer } from "app/blocks/transformer";
import { EventPreviewBuilder } from "./builders/event-preview";

@Component({
  selector: "app-event-preview-presenter",
  template: `<app-event-preview  [datasource]='ds' (closePreview)='onClosePreview()' [eventId]="eventId"></app-event-preview>`,
  styleUrls: ["./event-preview.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventPreviewPresenter implements OnInit {
  previewData!: any;
  ds!: EventPreview;
  eventId: number
  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private modelServiceService: ModelServiceService,
  ) {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      console.log('ID:', this.eventId);
    });
    this.ds = new EventPreview();
  }

  ngOnInit(): void {
    // this.socketService.onEventPreview().subscribe(
    //   (data) => {
    //     this.previewData = JSON.parse(data);
    //     console.log("from preview  this.previewData", this.previewData);
    //   },
    //   (error) => {
    //     console.error('Error occurred:', error);
    //   }
    // );

    this.modelServiceService.openPreview({ eventId: this.eventId }).subscribe(
      (data: any) => {
        console.log("data", data)
      },
      (error: any) => {
        console.log(error)
      }
    );

    Transformer._ComposeLiveObjectAsync(this.socketService._onEventPreview(), this.ds, EventPreviewBuilder);
    console.log(this.ds)
  }

  onClosePreview() {
    this.modelServiceService.closePreview({ eventId: this.eventId }).subscribe(
      (data: any) => {
        console.log("data", data)
      },
      (error: any) => {
        console.log(error)
      }
    );
  }




}

