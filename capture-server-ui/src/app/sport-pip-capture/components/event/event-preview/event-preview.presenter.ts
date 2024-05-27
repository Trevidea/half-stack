import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "app/sport-pip-capture/models/socket.service";
import { EventPreview, RangeEventPreviewView } from "./views/event-preview";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { Transformer } from "app/blocks/transformer";
import { EventPreviewBuilder } from "./builders/event-preview";
import Swal from "sweetalert2";

@Component({
  selector: "app-event-preview-presenter",
  template: `<app-event-preview  [datasource]='previewData' (closePreview)='onClosePreview()' [eventId]="eventId"></app-event-preview>`,
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
    this.socketService.onEventPreview().subscribe(
      (result) => {
        let data = JSON.parse(result);
        this.previewData = data?.result[0]?.[0]
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
    // Transformer._ComposeLiveObjectAsync(this.socketService._onPreviewEvent(), this.ds, EventPreviewBuilder);
    console.log(this.ds)
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
    Swal.fire({
      title: 'Close Preview',
      text: "Are you sure you want to close the preview?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, Sure',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-secondary ml-1'
      }
    }).then((result) => { // Changed to arrow function
      if (result.value) {
        this._closePreview(); // Corrected function call
      }
    });
  }


  _closePreview() {
    this.modelServiceService.closePreview({ eventId: this.eventId }).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Preview Closed',
          text: 'Preview of this event is closed by Garry',
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Ok',
          customClass: {
            cancelButton: 'btn btn-outline-secondary'
          }
        });
        console.log("data", data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}

