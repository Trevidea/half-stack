import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventPreviewComponent } from './event-preview.component';
import { SocketService } from 'src/app/services/web-socket/socket.service';
import { ActiveDeviceView, EventPreview } from './views/event-preview';
import { Subscription } from 'rxjs';
import { ModelService } from 'src/app/services/model-services/model-service.service';

@Component({
  selector: 'app-event-preview-presenter',
  standalone: true,
  imports: [EventPreviewComponent],
  template: `<app-event-preview [datasource]="ds" [eventId]="eventId"><app-event-preview>`,
  styleUrl: './event-preview.component.scss'
})
export class EventPreviewPresenter implements OnInit {
  eventId: number;
  ds!: EventPreview;
  messages: any[] = [];
  private socketSubscription: Subscription;
  status: string;

  constructor(private route: ActivatedRoute, private socketService: SocketService, private modelService: ModelService) {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      console.log('ID:', this.eventId);
    });
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


}
