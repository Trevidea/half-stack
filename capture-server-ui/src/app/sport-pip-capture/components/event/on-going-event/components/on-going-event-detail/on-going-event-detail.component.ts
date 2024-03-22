import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-on-going-event-detail',
  templateUrl: './on-going-event-detail.component.html',
  styleUrls: ['./on-going-event-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OnGoingEventDetailComponent implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }

}
