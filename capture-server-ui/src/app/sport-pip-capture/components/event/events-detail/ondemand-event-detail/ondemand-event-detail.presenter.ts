import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { TabStateService } from '../../event-utility/nav';
import { OnDemandEventRange } from '../views/ondemand-event';
import { UI } from '../../event-utility/event-ui-interface';

@Component({
  selector: 'app-ondemand-event-detail-presenter',
  template: `<app-ondemand-event-detail [datasource]="eventData" [dropdownItems]='dropdownItems' [currentIndex]='startIndex' [detailType]='detailType'></app-ondemand-event-detail>`,
  styleUrls: ['./ondemand-event-detail.component.scss']
})
export class OndemandEventDetailPresenter implements OnInit {
  @Input() eventData: any;
  @Input() detailType: string;
  @Input() dropdownItems: UI.DropDownMenuItem[]
  ds!: OnDemandEventRange;
  @Input() startIndex: number
  @Output()clickedmenu = new EventEmitter<number>()
  constructor(private service: ModelServiceService,
    private tabStateService: TabStateService) {
    this.ds = new OnDemandEventRange();
  }

  ngOnInit(): void {
    
  }


}
