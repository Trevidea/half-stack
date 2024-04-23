import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
export class OnGoingEventComponent implements OnInit, OnDestroy, OnChanges {
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

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datasource && changes.datasource.currentValue) {
      this.updateCountdownForOngoingEvents(this.datasource);
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.countdownInterval = setInterval(() => {
        this.updateCountdownForOngoingEvents(this.datasource);
      }, 50);
    }
  }

  eventDetail(e: string, index: number) {
    this.startIndex = index
    this.opOngoingDetail = true
    this._coreSidebarService.getSidebarRegistry(e).toggleOpen();
  }

  OnClosedDetail(data: any) {
    this.opOngoingDetail = false
  }

  clickedmenu(id: number) {
    this.eventId = id;
  }

  editOnDemandEvent() {
    this.router.navigate(['/on-demand-event'],
      {
        queryParams: { id: this.eventId },
      }
    )
  }

  deleteEvent(){
      }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  ///////// Will replace it in  dateTimeservice //// 
  updateCountdownForOngoingEvents(events: any[]) {
    const now = new Date();
    events.forEach(event => {
      const eventDateTime = new Date(event.dtEvent);
      eventDateTime.setHours(Math.floor(event.time / 100));
      eventDateTime.setMinutes(event.time % 100);

      if (now >= eventDateTime) {
        const elapsedTime = now.getTime() - eventDateTime.getTime();
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        const formattedTime = ` In Progress ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        event.ongoingCountdown = formattedTime;
      }
    });
  }

  padZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }



}
