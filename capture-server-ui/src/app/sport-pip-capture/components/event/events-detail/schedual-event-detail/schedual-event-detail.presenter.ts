import { Component, Input, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-schedual-event-detail-presenter',
  template: `<app-schedual-event-detail><app-schedual-event-detail>`,
  styleUrls: ['./schedual-event-detail.component.scss']
})
export class SchedualEventDetailPresenter implements OnInit {
  @Input() eventData:any
  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
  }


}
