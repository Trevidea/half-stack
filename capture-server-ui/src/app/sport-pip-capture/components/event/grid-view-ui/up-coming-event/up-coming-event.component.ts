import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';
@Component({
  selector: 'app-up-coming-event',
  templateUrl: './up-coming-event.component.html',
  styleUrls: ['./up-coming-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpComingEventComponent implements OnInit, OnDestroy {
  @Input() datasource;
  startIndex: number;
  openDetailmodel: boolean;
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => { } },
  ]
  constructor(private _coreSidebarService: CoreSidebarService, private dateTimeservice: DateTimeService) { }
  ngOnInit(): void {
    if(this.datasource) {
      this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
      this.countdownInterval = setInterval(() => {
        this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
      }, 50);
    }

  }

  viewDetail(event: string, index: number) {
    this.startIndex = index
    this.openDetailmodel = true
    this._coreSidebarService.getSidebarRegistry('upcoming-' + event).toggleOpen();
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

  private countdownInterval: any;

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
