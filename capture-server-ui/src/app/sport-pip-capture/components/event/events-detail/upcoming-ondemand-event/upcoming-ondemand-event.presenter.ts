import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-upcoming-ondemand-presenter',
  template:`<app-upcoming-ondemand-event></app-upcoming-ondemand-event>`,
  styleUrls: ['./upcoming-ondemand-event.component.scss']
})
export class UpcomingOndemandEventPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
