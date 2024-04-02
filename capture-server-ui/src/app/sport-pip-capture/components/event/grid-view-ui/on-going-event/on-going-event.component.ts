import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Subscription, interval } from 'rxjs';
import { DateTimeService } from '../../event-utility/date-time.service';
@Component({
  selector: 'app-on-going-event',
  templateUrl: './on-going-event.component.html',
  styleUrls: ['./on-going-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OnGoingEventComponent implements OnInit, OnDestroy {
  @Input() datasource: any
  private countdownInterval: any;

  constructor(private _coreSidebarService: CoreSidebarService, private dateTimeservice: DateTimeService) { }


  ngOnInit(): void {
    this.dateTimeservice.calculateCountdown(this.datasource);
    this.countdownInterval = setInterval(() => {
      this.dateTimeservice.calculateCountdown(this.datasource);
    }, 1000);
  }

  eventDetail(event: string) {
    this._coreSidebarService.getSidebarRegistry(event).toggleOpen();
  }



  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

}
