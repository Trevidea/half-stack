import { Component, Input, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../../event-utility/date-time.service';

@Component({
  selector: 'app-ondemand-event-detail',
  templateUrl: './ondemand-event-detail.component.html',
  styleUrls: ['./ondemand-event-detail.component.scss']
})
export class OndemandEventDetailComponent implements OnInit {
  @Input() datasource;
  @Input() currentIndex: number;
  @Input() detailType: string
  // currentIndex: number = 0;
  constructor(private _coreSidebarService: CoreSidebarService,public dateTimeservice: DateTimeService) { }
  ngOnInit(): void {
    console.log(this.datasource, this.currentIndex);
  }

  closeSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }

  nextEvent() {
    if (this.currentIndex < this.datasource.length - 1) {
      this.currentIndex++;
    }
  }

  previousEvent() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  get currentEvent() {
    return this.datasource[this.currentIndex];
  }
}
