import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
  rtmpUrl: string;
  private options: GlobalConfig;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
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

  constructRtmpUrl(): string {
    const username = this.datasource.userName.SelectedItem?.value || 'user';
    const rtmpUrl = `rtmp://drake.in:1935/${this.datasource.appName}/${username}`;
    this.rtmpUrl = rtmpUrl
    return rtmpUrl;
  }
  copyCode(inputTextValue) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.value = inputTextValue;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    this.toastr.success('', 'Copied sucessfully', { toastClass: 'toast ngx-toastr', closeButton: true });
  }
}
