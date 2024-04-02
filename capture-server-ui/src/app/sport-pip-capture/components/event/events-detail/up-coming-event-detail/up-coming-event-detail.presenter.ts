import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-up-coming-event-detil-presenter',
  templateUrl: './up-coming-event-detail.component.html',
  styleUrls: ['./up-coming-event-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpComingEventDetilPresenter implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }


}
