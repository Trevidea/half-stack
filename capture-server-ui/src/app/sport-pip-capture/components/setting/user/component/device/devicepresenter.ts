import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeviceViewRange } from './view/device';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { Transformer } from 'app/blocks/transformer';
import { DeviceBuilder } from './builder/device';
import { PresenterAction } from 'app/blocks/actions';

@Component({
  selector: 'app-device-presenter',
  template: `<app-device [datasource]='ds.deviceView' (onAddDevice)='loadDeviceList()'></app-device>`,
  styleUrls: ['./device.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevicePresenter implements OnInit {
  ds!: DeviceViewRange
  constructor(private modelservice: ModelServiceService) {
    this.ds = new DeviceViewRange();
  }

  ngOnInit(): void {
    this.loadDeviceList();
  }

  loadDeviceList() {
    Transformer.ComposeCollectionAsync(this.modelservice.deviceList(), this.ds.deviceView, DeviceBuilder)
  }
}
