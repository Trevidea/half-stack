import { Component, OnInit } from '@angular/core';
import { DeviceComponent } from './device.component';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { Transformer } from 'src/app/blocks/transformer';
import { DeviceBuilder } from './builder/device';
import { DeviceViewRange } from './view/device';

@Component({
  selector: 'app-device-presenter',
  standalone: true,
  imports: [DeviceComponent],
  template: `<app-device [datasource]="ds" (onAddDevice)="loadDeviceList()" (onDelete)="deleteSelected($event)" ></app-device>`,
  styleUrl: './device.component.scss'
})
export class DevicePresenter implements OnInit {
  ds!: DeviceViewRange


  constructor(private modelService: ModelService) {
    this.ds = new DeviceViewRange();
  }

  ngOnInit(): void {
    this.loadDeviceList();
  }

  loadDeviceList() {
    Transformer.ComposeCollectionAsync(this.modelService.deviceList(), this.ds.deviceView, DeviceBuilder)
  }

  deleteSelected(id: number) {
    this.modelService.delete('devices', id).subscribe((data) => {
      console.log(data)
      this.loadDeviceList();
    })
  }
}
