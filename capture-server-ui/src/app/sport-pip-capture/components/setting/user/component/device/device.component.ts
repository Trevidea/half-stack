import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceFormPresenter } from '../device-form/device-form.presenter';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeviceComponent implements OnInit {
  @Input() datasource: any;
  @Output() onAddDevice = new EventEmitter();

  constructor(private ngbModel: NgbModal, private modelservice: ModelServiceService) { }

  ngOnInit(): void {
  }

  openDeviceForm() {
    const modalRef = this.ngbModel.open(DeviceFormPresenter, {
      centered: true,
      size: 'md'
    })
    modalRef.shown.subscribe(o => {
      const inst: DeviceFormPresenter = modalRef.componentInstance;
      inst.onUpdate.subscribe(res => {
        console.log(res)
        if (res) {
          this.onAddDevice.emit();
        }
      });
    })
  }

  deleteSelected(id: number) {
    this.modelservice.delete('devices', id).subscribe((data) => {
      console.log(data)
      this.onAddDevice.emit();
    })
  }
}
