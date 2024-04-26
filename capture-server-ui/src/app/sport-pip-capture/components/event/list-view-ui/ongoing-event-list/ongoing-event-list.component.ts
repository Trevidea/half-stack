import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DateTimeService } from '../../event-utility/date-time.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UI } from '../../event-utility/event-ui-interface';

@Component({
  selector: 'app-ongoing-event-list',
  templateUrl: './ongoing-event-list.component.html',
  styleUrls: ['./ongoing-event-list.component.scss']
})
export class OngoingEventListComponent implements OnInit, OnDestroy {
  @Input() datasource: any;
  startIndex: number;
  eventId: number;
  opOngoingDetail: boolean = false;
  private countdownInterval: any;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => { } },
  ]

  constructor(private _coreSidebarService: CoreSidebarService, private dateTimeService: DateTimeService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datasource && changes.datasource.currentValue) {
      this.dateTimeService.updateCountdownForOngoingEvents(this.datasource);
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.countdownInterval = setInterval(() => {
        this.dateTimeService.updateCountdownForOngoingEvents(this.datasource);
      }, 50);
    }
  }


  eventDetail(event: string) {
    this._coreSidebarService.getSidebarRegistry(event).toggleOpen();
  }

  openDetailView(key: string, index: number) {
    this.startIndex = index
    this.opOngoingDetail = true
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  OnClosedDetailView(data: any) {
    this.opOngoingDetail = false
  }

  clickedmenu(id: number) {
    this.eventId = id;
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
