import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DateTimeService } from '../event-utility/date-time.service';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventPreviewComponent implements OnInit {
  @Input() datasource: any
  private countdownInterval: any;
 
  constructor(public dateTimeservice: DateTimeService,) { }

  ngOnInit(): void {
  
  }
  calculateUpcomingCountdown(item: any): string {
    const now = new Date();
    const eventDateTime = new Date(item?.dtEvent);
    eventDateTime.setHours(Math.floor(item.time / 100));
    eventDateTime.setMinutes(item.time % 100);
    const diff = eventDateTime.getTime() - now.getTime();

    if (diff >= 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const countdown = `Starts in ${this.padZero(days)} days, ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      return countdown;
    } else {
      return 'Event has ended';
    }
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


}