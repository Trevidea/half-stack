import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../../../event-utility/date-time.service';

@Component({
  selector: 'app-schedual-event-detail',
  templateUrl: './schedual-event-detail.component.html',
  styleUrls: ['./schedual-event-detail.component.scss']
})
export class SchedualEventDetailComponent implements OnInit {
  @Input() datasource;

  constructor(private _coreSidebarService: CoreSidebarService,
    public dateTimeservice: DateTimeService,
    private router: Router,) { }



  ngOnInit(): void {
    console.log(this.datasource);
  }


}
