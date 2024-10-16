import { Component } from '@angular/core';
import { ConnectionDeviceDetailComponent } from "./connection-device-detail.component";

@Component({
  selector: 'app-connection-device-detail-presenter',
  standalone: true,
  imports: [ConnectionDeviceDetailComponent],
  template: `<app-connection-device-detail></app-connection-device-detail>`,
  styleUrl: './connection-device-detail.component.scss'
})
export class ConnectionDeviceDetailPresenter {

}
