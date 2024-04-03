import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-ondemand-event-detail',
  templateUrl: './ondemand-event-detail.component.html',
  styleUrls: ['./ondemand-event-detail.component.scss']
})
export class OndemandEventDetailComponent implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }
}
