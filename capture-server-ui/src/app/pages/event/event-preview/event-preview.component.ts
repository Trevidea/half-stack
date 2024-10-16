import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { ActiveDevicesComponent } from "./active-devices/active-devices.component";
import { DateTimeFormatPipe } from "../../../pipe/date-time-format";
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceToEventPresenter } from '../add-device-to-event/add-device-to-event.presenter';

@Component({
  selector: 'app-event-preview',
  standalone: true,
  imports: [MaterialModule, CommonModule, TablerIconsModule, ActiveDevicesComponent, DateTimeFormatPipe],
  templateUrl: './event-preview.component.html',
  styleUrl: './event-preview.component.scss'
})
export class EventPreviewComponent {
  @Input() datasource: any;
  @Input() eventId: any;

  private countdownInterval: any;
  @Output() closePreview = new EventEmitter()

  constructor(private dialog: MatDialog) { }

  onAddDeviceToevent() {
    const dialogRef = this.dialog.open(AddDeviceToEventPresenter, {
      data: { eventId: this.eventId },
      maxWidth: '700px',
      width: '100%',

    });
  }
}
