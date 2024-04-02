import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-upcoming-ondemand-event',
  templateUrl: './upcoming-ondemand-event.component.html',
  styleUrls: ['./upcoming-ondemand-event.component.scss']
})
export class UpcomingOndemandEventComponent implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }
}
