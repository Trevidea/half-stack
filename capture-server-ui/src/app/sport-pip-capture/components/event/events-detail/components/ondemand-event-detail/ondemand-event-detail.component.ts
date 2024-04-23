import { Component, Input, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../../../event-utility/date-time.service';
import { UI } from '../../../event-utility/event-ui-interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-ondemand-event-detail',
  templateUrl: './ondemand-event-detail.component.html',
  styleUrls: ['./ondemand-event-detail.component.scss']
})
export class OndemandEventDetailComponent implements OnInit {
  @Input() datasource;
  @Input() dropdownItems: UI.DropDownMenuItem[];
  constructor(private _coreSidebarService: CoreSidebarService, public dateTimeservice: DateTimeService, private router: Router,) { }
  ngOnInit(): void {
    console.log(this.datasource);
  }




}
