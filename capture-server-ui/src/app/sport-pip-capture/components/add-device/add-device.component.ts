import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDeviceComponent implements OnInit {
  @Input() datasource: any
  private toastRef: any;
  private options: GlobalConfig;

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
  }

  ngOnInit(): void {
  }
  toastrSuccess() {
    this.toastr.success('', 'Device Added!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  onsave() {
    this.toastrSuccess()
    // this.activeModal.close('Accept click')
  }
}
