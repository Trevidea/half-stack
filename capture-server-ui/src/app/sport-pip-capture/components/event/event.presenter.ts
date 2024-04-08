import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { EventRange } from './views/event';
import { Transformer } from 'app/blocks/transformer';
import { EventRangeBuilder } from './builders/event';
import { ArrayBuilder } from 'app/sport-pip-capture/blocks/array.builder';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { Data } from 'app/sport-pip-capture/models/capture-interface';
import { TabStateService } from './event-utility/nav';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventComponent } from './event.component';

@Component({
  selector: 'app-event-presenter',
  template: `<app-event  [datasource]="filteredData" (filter)="onFilter($event)" (onTabChange)="onTabChange()" ></app-event>`,
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EventPresenter implements OnInit {
  query: Data.FilterParams
  activeTab: string;
  ds!: EventRange
  filteredData: any;
  progress: number = 0;
  isSyncing: boolean = false;
  constructor(private router: Router,
    private modalService: NgbModal,
    private dataFactory: DataFactoryService,
    private service: ModelServiceService,
    private tabStateService: TabStateService) {
    this.ds = new EventRange()
  }

  ngOnInit(): void {
    const status = this.tabStateService.getActiveTab()
    Transformer.ComposeCollectionAsync(this.service.eventJson(), this.ds.event, EventRangeBuilder);
    this.query.status = status
    this.filteredData = this.filterEvents(this.ds.event, this.query);
  }



  onFilter(filter: Data.FilterParams) {
    filter.status = this.tabStateService.getActiveTab()
    console.log(filter)
    this.query = filter;
    this.filteredData = this.filterEvents(this.ds.event, filter);
  }


  onTabChange(): void {
    Transformer.ComposeCollectionAsync(this.service.eventJson(), this.ds.event, EventRangeBuilder);
    this.onFilter(this.query)

  }


  filterEvents(data, query) {
    return data.filter(item => {
      for (const key in query) {
        if (query[key] !== null && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }


}
