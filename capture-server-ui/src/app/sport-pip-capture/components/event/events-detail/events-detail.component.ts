import { Component, Input, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../event-utility/date-time.service';
import { Router } from '@angular/router';
import { UI } from '../event-utility/event-ui-interface';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.scss']
})
export class EventsDetailComponent implements OnInit {
  @Input() datasource;
  @Input() currentIndex: number;
  @Input() detailType: string
  @Input() dropdownItems: UI.DropDownMenuItem[];

  constructor(private _coreSidebarService: CoreSidebarService, public dateTimeservice: DateTimeService, private router: Router,) { }

  ngOnInit(): void {
    console.log(this.datasource, this.currentIndex);
  }

  previousEvent() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextEvent() {
    if (this.currentIndex < this.datasource.length - 1) {
      this.currentIndex++;
    }
  }


  get currentEvent() {
    return this.datasource[this.currentIndex];
  }

  closeSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }
}
