import { Component, Input, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { TabStateService } from '../../event-utility/nav';
import { OnDemandEventRange } from '../views/ondemand-event';

@Component({
  selector: 'app-ondemand-event-detail-presenter',
  template: `<app-ondemand-event-detail [datasource]="eventData" [startIndex]='startIndex'></app-ondemand-event-detail>`,
  styleUrls: ['./ondemand-event-detail.component.scss']
})
export class OndemandEventDetailPresenter implements OnInit {
  @Input() eventData:any;
  ds!:OnDemandEventRange;
  @Input() startIndex:number
  constructor(private service: ModelServiceService,
    private tabStateService: TabStateService ) { 
      this.ds = new OnDemandEventRange();
    }

  ngOnInit(): void {

  }

}
