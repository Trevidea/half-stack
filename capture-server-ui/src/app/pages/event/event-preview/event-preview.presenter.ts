import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventPreviewComponent } from './event-preview.component';
import { SocketService } from 'src/app/services/web-socket/socket.service';
import { ActiveDeviceView, EventPreview } from './views/event-preview';
import { Subscription } from 'rxjs';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-event-preview-presenter',
  standalone: true,
  imports: [EventPreviewComponent],
  template: `<app-event-preview [datasource]="ds" [eventId]="eventId" (closePreview)='onClosePreview()'><app-event-preview>`,
  styleUrl: './event-preview.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventPreviewPresenter implements OnInit {
  eventId: number;
  ds!: EventPreview;
  messages: any[] = [];
  private socketSubscription: Subscription;
  status: string;

  constructor(private route: ActivatedRoute, private socketService: SocketService,
    private modelService: ModelService,
    private router: Router) {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      console.log('ID:', this.eventId);
    });
    this.ds = new EventPreview();
  }

  ngOnInit(): void {
    this.socketSubscription = this.socketService.onTopicMessage('event-preview').subscribe((message) => {
      const data: any = JSON.parse(message["data"]);
      const previewData: any = data.result[0][0];
      console.log(previewData)

      this.ds.title = previewData["title"];
      this.ds.level = previewData["level"];
      this.ds.dtEvent = previewData["dtEvent"];
      this.ds.program = previewData["program"];
      this.ds.sport = previewData["sport"];
      this.ds.status = previewData["status"];
      this.ds.time = previewData["time"];
      this.ds.type = previewData["type"];
      this.ds.venue = previewData["venue"];
      this.ds.previewActiveDevice.Clear();
      previewData["activeDevices"].forEach(element => {
        var activeDevice: ActiveDeviceView = new ActiveDeviceView();
        activeDevice.name = element["name"]
        activeDevice.activeDeviceId = element["device_id"];
        activeDevice.deviceType = element["devicetype"];
        activeDevice.location = element["location"];
        activeDevice.network = element["network"];
        activeDevice.user = element["userId"];
        activeDevice.appName = element['app_name'];
        activeDevice.pin = element["pin"];
        activeDevice.direction = element["direction"];
        activeDevice.status = element["status"]

        this.ds.previewActiveDevice.Add(activeDevice);
      });
      this.status = '';
    }, () => {
      this.status = 'Connection lost. Reconnecting...';
    });

    console.log(this.ds)
    this.modelService.openPreview({ eventId: this.eventId }).subscribe(
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
        confirmButton: 'confirm-btn',
        cancelButton: 'btn btn-outline-secondary ml-1'
      }
    }).then((result) => {
      if (result.value) {
        this._closePreview();
      }
    });
  }

  _closePreview() {
    this.modelService.closePreview({ eventId: this.eventId }).subscribe(
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
        }).then(
          (result) => {
            if (result.isDismissed) {
              this.router.navigate(['events/events-list'])
            }
          }
        )

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
