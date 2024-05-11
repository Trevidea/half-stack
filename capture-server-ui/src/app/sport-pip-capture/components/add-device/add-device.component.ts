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
  @Input() datasource: any;
  urlCopied: boolean = false;
  iconName: string = 'copy';
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
    const devicename =
      this.datasource.deviceName.SelectedItem?.value ?
        `/${this.datasource.deviceName.SelectedItem.value.trim().replace(/\s+/g, '-').toLowerCase()}` : '';
    const pin = this.datasource.pin ? `/${this.datasource.pin}` : '';
    const rtmpUrl = `rtmp://drake.in:1935/${this.datasource.appName}${devicename}${pin}`;
    this.rtmpUrl = rtmpUrl;
    return rtmpUrl;
  }

  copyUrl(inputTextValue) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.value = inputTextValue;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    this.urlCopied = true;
    this.iconName = 'check';
    setTimeout(() => {
      this.urlCopied = false;
      this.iconName = 'copy';
    }, 3000);
  }
}
