import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Subscription, interval } from 'rxjs';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-on-going-event',
  templateUrl: './on-going-event.component.html',
  styleUrls: ['./on-going-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OnGoingEventComponent implements OnInit, OnDestroy {
  startIndex: number;
  eventId: number;
  opOngoingDetail: boolean = false;
  @Input() datasource: any
  private countdownInterval: any;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Edit Event', icon: 'edit', type: 'feather', action: () => this.editOnDemandEvent() },
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => { } },
  ]
  constructor(private _coreSidebarService: CoreSidebarService,
    private dateTimeservice: DateTimeService,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.datasource) {
      this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
      this.countdownInterval = setInterval(() => {
        this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
      }, 1000);
    }
   console.log(this.datasource)
  }

  eventDetail(event: string, index: number) {
    this.startIndex = index
    this.opOngoingDetail = true
    this._coreSidebarService.getSidebarRegistry('ongoing-' + event).toggleOpen();
  }

  OnClosedDetail(data: any) {
    console.log("core side bar closed")
    this.opOngoingDetail = false
  }

  clickedmenu(id: number) {
    console.log("yes menu clicked ", id)
    this.eventId = id;
  }

  editOnDemandEvent() {
    this.router.navigate(['/on-demand-event'],
      {
        queryParams: { id: this.eventId },
      }
    )
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  calculateUpcomingCountdown(event: any): string {
    const eventDateTime = new Date(event.dtEvent || "");
    eventDateTime.setHours(Math.floor(event.time || 0 / 100));
    eventDateTime.setMinutes((event.time || 0) % 100);

    // Calculate the difference between the current time and the event start time
    const now = new Date();
    const diff = now.getTime() - eventDateTime.getTime();

    // Convert the difference to positive if it's negative
    const diffMillis = Math.abs(diff);

    // Calculate hours, minutes, and seconds from the difference
    const hours = Math.floor(diffMillis / (1000 * 60 * 60));
    const minutes = Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMillis % (1000 * 60)) / 1000);

    // Format the running time as HH:mm:ss
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


}
