import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { RangeEventPreviewView } from "./views/event-preview";
import { Subscription } from "rxjs";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";

@Component({
  selector: "app-event-preview-presenter",
  template: `<app-event-preview [datasource]='previewData?.result[0]?.[0]' (closePreview)='onClosePreview()'></app-event-preview>`,
  styleUrls: ["./event-preview.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventPreviewPresenter implements OnInit {
  previewData!: any;
  ds!: RangeEventPreviewView;
  eventId: number
  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private modelServiceService: ModelServiceService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.eventId = parseInt(params['eventId']);
      console.log(this.eventId)
    });

  }

  ngOnInit(): void {
    console.log("Subscribing to onEventPreview");

    this.socketService.onEventPreview().subscribe(
      (data) => {
        this.previewData = JSON.parse(data);
        console.log("from preview  this.previewData", this.previewData);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );

    this.modelServiceService.openPreview({ eventId: this.eventId }).subscribe(
      (data: any) => {
        console.log("data", data)
      },
      (error: any) => {
        console.log(error)
      }
    );



  }

  onClosePreview() {
     console.log("clicked closed preview ")
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

