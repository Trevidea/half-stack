import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-on-going-event',
  templateUrl: './on-going-event.component.html',
  styleUrls: ['./on-going-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OnGoingEventComponent implements OnInit {
  @Input() datasource: any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;


  constructor(private _coreSidebarService: CoreSidebarService) { }
  
  ngOnInit(): void {
   setInterval(() => {
      this.calculateCountdown();
    }, 50);
    this.calculateCountdown();
  }


  eventDetail(event: string) {
    this._coreSidebarService.getSidebarRegistry(event).toggleOpen();
  }


  calculateCountdown(): void {
    const now = new Date();
    this.datasource.forEach(event => {
      const eventDateTime = new Date(event._dtEvent);
      eventDateTime.setHours(Math.floor(event._time / 100));
      eventDateTime.setMinutes(event._time % 100);
      const diff = eventDateTime.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        event.countdown = `${this.padZero(days)} days, ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      } else {
        event.countdown = 'Event started';
      }
    });
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  
  formatDateTime(dateTimeString: string, time: number): string {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    const timeHours = Math.floor(time / 100);
    const timeMinutes = time % 100;
    const amPm = timeHours >= 12 ? 'pm' : 'am';
    const formattedHours = timeHours % 12 || 12;
    const formattedMinutes = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    return `${formattedDate}, ${formattedHours}:${formattedMinutes} ${amPm}`;
  }

}
