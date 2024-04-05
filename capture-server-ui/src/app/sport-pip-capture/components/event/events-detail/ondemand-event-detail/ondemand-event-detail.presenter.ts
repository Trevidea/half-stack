import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-ondemand-event-detail-presenter',
  template: `<app-ondemand-event-detail></app-ondemand-event-detail>`,
  styleUrls: ['./ondemand-event-detail.component.scss']
})
export class OndemandEventDetailPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
