import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
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
  streamingUrl: string;
  private options: GlobalConfig;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
  }

  ngOnInit(): void {
    this.datasource.streamId = this.generateShortUUID(12);
  }
  toastrSuccess() {
    this.toastr.success('', 'Device Added!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  onTypeSelect() {

  }

  constructRtmpUrl(): string {
    const deviceName = this.datasource.deviceName.SelectedItem?.value?.trim().replace(/\s+/g, '-').toLowerCase() ?? '';
    const pin = this.datasource.pin ? `/${this.datasource.pin}` : '';
    const appName = this.datasource.appNamesCollection?.SelectedItem?.trim().replace(/\s+/g, '-').toLowerCase() ?? '';
    const type = this.datasource.type.SelectedItem;
    let rtmpUrl = 'rtmp://drake.in:1935/';
    let player = 'https://half-stack.com:3334/'
    let streamingUrl = '';

    if (type === 'Player') {
      streamingUrl = 'https://half-stack.com:3334/';
    } else if (type === 'Streaming') {
      streamingUrl = 'rtmp://half-stack.com:1935/';
    }

    if (appName) {
      streamingUrl += `${appName}/`;
    }

    if (deviceName) {
      streamingUrl += `${deviceName}${pin}`;
    }

    this.streamingUrl = streamingUrl;
    return streamingUrl;
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


  private generateShortUUID = (length: number) => {
    return uuidv4().replace(/-/g, '').substring(0, length);
  };

  updateStreamName(): string {
    const devicename = this.datasource.deviceName.SelectedItem?.value?.trim().replace(/\s+/g, '').toLowerCase() ?? '';
    const username = this.datasource.userName.SelectedItem?.value?.trim().replace(/\s+/g, '').toLowerCase() ?? '';
    const eventId = this.datasource.eventId;
    this.datasource.streamName = `${username}_${devicename}_${eventId}`;
    return this.datasource.streamName;
  }


}
