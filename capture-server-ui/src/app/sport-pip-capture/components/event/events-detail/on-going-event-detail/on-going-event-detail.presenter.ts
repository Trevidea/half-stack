import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-on-going-event-detail-presenter',
  template: `<app-on-going-event-detail></app-on-going-event-detail>`,
  styleUrls: ['./on-going-event-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OnGoingEventDetailPresenter implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }

}
