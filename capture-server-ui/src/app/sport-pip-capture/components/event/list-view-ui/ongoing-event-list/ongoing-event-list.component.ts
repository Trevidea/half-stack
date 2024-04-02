import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DateTimeService } from '../../event-utility/date-time.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-ongoing-event-list',
  templateUrl: './ongoing-event-list.component.html',
  styleUrls: ['./ongoing-event-list.component.scss']
})
export class OngoingEventListComponent implements OnInit, OnDestroy {
  @Input() datasource: any;
  private countdownInterval: any;

  constructor(private _coreSidebarService: CoreSidebarService, private dateTimeService: DateTimeService) { }

  ngOnInit(): void {
    this.dateTimeService.calculateCountdown(this.datasource);
    this.countdownInterval = setInterval(() => {
      this.dateTimeService.calculateCountdown(this.datasource);
    }, 50);
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
