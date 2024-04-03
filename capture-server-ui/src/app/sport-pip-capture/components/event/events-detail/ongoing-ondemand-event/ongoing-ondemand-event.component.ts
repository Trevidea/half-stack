import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-ongoing-ondemand-event',
  templateUrl: './ongoing-ondemand-event.component.html',
  styleUrls: ['./ongoing-ondemand-event.component.scss']
})
export class OngoingOndemandEventComponent implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }
}
