import { Component, Input, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';
import { Route, Router } from '@angular/router';

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
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => { } },
    { label: 'Edit Event', icon: 'edit', type: 'feather', action: () => this.editOnDemandEvent() },
  ]
  constructor(private _coreSidebarService: CoreSidebarService, public dateTimeservice: DateTimeService, private router: Router,) { }
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


  editOnDemandEvent() {
    this.router.navigate(['/on-demand-event'], {
      queryParams: { id: this.currentEvent?.id },
    })
  }


}
