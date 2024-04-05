import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-schedual-event-detail',
  templateUrl: './schedual-event-detail.component.html',
  styleUrls: ['./schedual-event-detail.component.scss']
})
export class SchedualEventDetailComponent implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }

}
