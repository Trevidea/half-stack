import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceFormPresenter } from '../device-form/device-form.presenter';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeviceComponent implements OnInit {
  @Input() datasource: any;
  constructor(private ngbModel: NgbModal) { }

  ngOnInit(): void {
    console.log(this.datasource)
  }

  openDeviceForm() {
    this.ngbModel.open(DeviceFormPresenter, {
      centered: true,
      size: 'md'
    })
  }

}
