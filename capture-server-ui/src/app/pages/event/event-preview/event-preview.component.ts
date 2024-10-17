import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { ActiveDevicesComponent } from "./active-devices/active-devices.component";
import { DateTimeFormatPipe } from "../../../pipe/date-time-format";
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceToEventPresenter } from '../add-device-to-event/add-device-to-event.presenter';
import { Location } from '@angular/common';

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

  constructor(private dialog: MatDialog,private location: Location) { }

  onAddDeviceToevent() {
    const dialogRef = this.dialog.open(AddDeviceToEventPresenter, {
      data: { eventId: this.eventId },
      maxWidth: '700px',
      width: '100%',

    });
  }

  ngOnInit(): void {
    console.log(this.datasource)
    setInterval(() => {
      this.calculateUpcomingCountdown(this.datasource)
    }, 50)
  }

  calculateUpcomingCountdown(item: any) {
    const now = new Date();
    const eventDateTime = new Date(item?.dtEvent);
    eventDateTime.setHours(Math.floor(item?.time / 100));
    eventDateTime.setMinutes(item?.time % 100);
    const diff = eventDateTime.getTime() - now.getTime();
    if (diff >= 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      this.datasource.countdown = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


goBack() {
    this.location.back();
  }
}
