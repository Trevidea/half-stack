import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DateTimeService } from '../event-utility/date-time.service';
import { Router } from '@angular/router';
import { UI } from '../event-utility/event-ui-interface';
import { Transformer } from 'app/blocks/transformer';
import { OnDemandEventRange } from './views/ondemand-event';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { TabStateService } from '../event-utility/nav';
import { OnDemandBuilder } from './builders/ondemand-event';

@Component({
  selector: 'app-events-detail-presenter',
  template: `<app-events-detail [datasource]="eventData" [dropdownItems]='dropdownItems' [currentIndex]='startIndex' [sidebarkey]='sidebarkey'
  (clickedmenu)='clickmenu($event)'></app-events-detail>`,
  styleUrls: ['./events-detail.component.scss']
})
export class EventsDetailPresenter implements OnInit {
  @Input() eventData: any;
  @Input() dropdownItems: UI.DropDownMenuItem[]
  ds!: OnDemandEventRange;
  status: string;
  @Input() startIndex: number
  @Output() clickedmenu = new EventEmitter<number>()
  @Input() sidebarkey: any
  constructor(
    private tabStateService: TabStateService) {
    this.ds = new OnDemandEventRange();
  }

  ngOnInit(): void {
    this.status = this.tabStateService.getActiveTab();
    // if (this.status) {
    //   Transformer.ComposeCollectionAsync(this.service.eventDetails(this.status, "on-demand",), this.ds.event, OnDemandBuilder)
    //   console.log(this.ds)
    // }

  }

  clickmenu(id: number) {
    console.log('detail to parent', id)
    this.clickedmenu.emit(id)
  }


}
