import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { AddDeviceToEventPresenter } from './add-device-to-event.presenter';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidationAlertComponent } from "../../blocks/validation-alert/validation-alert.component";
@Component({
  selector: 'app-add-device-to-event',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule, TablerIconsModule, ValidationAlertComponent],
  templateUrl: './add-device-to-event.component.html',
  styleUrl: './add-device-to-event.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddDeviceToEventComponent implements OnInit {

  @Input() datasource: any;
  urlCopied: boolean = false;
  iconName: string = 'copy';
  streamingUrl: string;
  // private options: GlobalConfig;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
    this.datasource.streamId = this.generateShortUUID(12);
  }

  constructRtmpUrl(): string {
    const deviceName = this.datasource.deviceName.SelectedItem?.key
    const pin = this.datasource.pin ? `/${this.datasource.pin}` : '';
    const appName = this.datasource.appNamesCollection?.SelectedItem?.trim().replace(/\s+/g, '').toLowerCase() ?? '';
    const type = this.datasource.type.SelectedItem;
    let rtmpUrl = `${environment.rtmpUrl}/`;
    let player = `${environment.playerUrl}/`
    let streamingUrl = '';

    if (type === 'Player') {
      streamingUrl = player;
    } else if (type === 'Streaming') {
      streamingUrl = rtmpUrl;
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
