import { Component, OnInit } from '@angular/core';
import { ConnectionDeviceDetailComponent } from "./connection-device-detail.component";
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StreamingConfigurationComponent } from './streaming-configuration/streaming-configuration.component';

@Component({
  selector: 'app-connection-device-detail-presenter',
  standalone: true,
  imports: [ConnectionDeviceDetailComponent, StreamingConfigurationComponent],
  template: `<app-connection-device-detail [url]="url"></app-connection-device-detail>`,
  styleUrl: './connection-device-detail.component.scss'
})
export class ConnectionDeviceDetailPresenter implements OnInit {
  url: string;
  deviceDetails: any
  constructor(private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      const devicedetail = JSON.parse(params['devicedetail']);
      this.deviceDetails = devicedetail
      console.log(devicedetail);
    });
  }
  ngOnInit(): void {
    this.url = `${environment.playerUrl}/${this.deviceDetails._appName}/${this.deviceDetails._activeDeviceId}/llhls.m3u8?pin=${this.deviceDetails._pin}`;
    console.log(this.url);
  }
}
