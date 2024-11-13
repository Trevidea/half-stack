import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { LiveConnectionHeaderComponent } from "./components/live-connection-header/live-connection-header.component";
import { LiveConnectionGridListToogleComponent } from "./components/live-connection-grid-list-toogle/live-connection-grid-list-toogle.component";
import { LiveEventConnectionComponent } from "./live-event-connection.component";
import { ConnectionDetailsView, liveEventDetail } from './views/live-event';
import { SocketService } from 'src/app/services/web-socket/socket.service';
import { Subscription } from 'rxjs';
import { EventRunnerService } from 'src/app/services/event-runner/event-runner.service';


@Component({
  selector: 'app-live-event-connection-prsenter',
  standalone: true,
  imports: [LiveEventConnectionComponent],
  template: `<app-live-event-connection [datasource]='ds'></app-live-event-connection>`,
  styleUrl: './live-event-connection.component.scss'
})
export class LiveEventConnectionPresenter implements OnInit, OnDestroy {

  ds!: liveEventDetail;
  socketDs!: liveEventDetail;
  private socketSubscription: Subscription;
  constructor(
    private socketService: SocketService,
    private eventRunnerService: EventRunnerService
  ) {
    this.ds = new liveEventDetail();
    this.socketDs = new liveEventDetail();
  }

  ngOnInit(): void {
    this.ds = this.socketDs;
    this.socketSubscription = this.socketService.onTopicMessage('live-event').subscribe((message) => {
      const data: any = JSON.parse(message["data"]);
      console.log(data)
      const liveEventData: any = data.result[0][0];
      console.log(liveEventData)
      this.eventRunnerService.setstartedEventId(liveEventData["event_id"])
      this.ds.id = liveEventData["event_id"]
      this.ds.title = liveEventData["title"];
      this.ds.level = liveEventData["level"];
      this.ds.dtEvent = liveEventData["dtEvent"];
      this.ds.program = liveEventData["program"];
      this.ds.sport = liveEventData["sport"];
      this.ds.status = liveEventData["status"];
      this.ds.time = liveEventData["time"];
      this.ds.type = liveEventData["type"];
      this.ds.venue = liveEventData["venue"];
      this.ds.detail = liveEventData["detail"];
      this.ds.connectionDetails.Clear()
      liveEventData["connectionDetails"]?.forEach(element => {
        var connectionDetails: ConnectionDetailsView = new ConnectionDetailsView();
        connectionDetails.event_id = element["event_id"]
        connectionDetails.device = element["device"];
        connectionDetails.ipAddress = element["ip_add"];
        connectionDetails.role = element["role"];
        connectionDetails.name = element["name"];
        connectionDetails.quality = element["quality"];
        connectionDetails.received = element["filesReceived"];
        connectionDetails.retries = element["retries"];
        connectionDetails.location = element["location"];
        connectionDetails.network = element["network"];
        connectionDetails.transmitStatus = element["transmitStatus"];
        connectionDetails.id = element["id"];
        connectionDetails.appName = element['app_name'];
        connectionDetails.pin = element["pin"];
        connectionDetails.direction = element["direction"];
        connectionDetails.activeDeviceId = element["device_id"]
        this.ds.connectionDetails.Add(connectionDetails);
      });
    });

  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      console.log("Socket unsubscribed..", this.socketSubscription)
      this.socketSubscription.unsubscribe();
    }
  }

}
