import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';
import { Router } from '@angular/router';
import { SocketService } from 'app/sport-pip-capture/models/socket.service';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
@Component({
  selector: 'app-up-coming-event',
  templateUrl: './up-coming-event.component.html',
  styleUrls: ['./up-coming-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpComingEventComponent implements OnInit, OnDestroy, OnChanges {
  @Input() datasource;
  startIndex: number;
  openDetailmodel: boolean;
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  private countdownInterval: any;
  eventId: number;

  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Edit Event', icon: 'edit', type: 'feather', action: () => this.editOnDemandEvent() },
    { label: 'Share Event', icon: 'share', type: 'feather', action: () => { } },
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => this.deleteEvent() },
  ]

  constructor(private _coreSidebarService: CoreSidebarService,
    private dateTimeservice: DateTimeService,
    private router: Router,
    private Modelservice: ModelServiceService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datasource && changes.datasource.currentValue) {
      this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.countdownInterval = setInterval(() => {
        this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
      }, 50);
    }
  }

  openDetailView(key: string, index: number) {
    this.startIndex = index
    this.openDetailmodel = true
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  OnClosedDetail(data: any) {
    this.openDetailmodel = false
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


  navigateToEventPreview(eventId: number) {
    this.router.navigate(['/event/event-preview'], {
      queryParams: { eventId: eventId }
    });
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  clickedmenu(id: number) {
    console.log("pare", id)
    this.eventId = id;
  }

  editOnDemandEvent() {
    this.router.navigate(['/on-demand-event'],
      {
        queryParams: { id: this.eventId },
      }
    )
  }

  deleteEvent() {
    this.Modelservice.delete('event', this.eventId);
  }


}

