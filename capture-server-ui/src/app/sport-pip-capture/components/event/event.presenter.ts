import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { EventRange } from './views/event';
import { Transformer } from 'app/blocks/transformer';
import { EventRangeBuilder } from './builders/event';
import { ArrayBuilder } from 'app/sport-pip-capture/blocks/array.builder';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { Data } from 'app/sport-pip-capture/models/capture-interface';
import { TabStateService } from './event-utility/nav';
import { EventFilter } from './event-utility/event-filter';

@Component({
  selector: 'app-event-presenter',
  template: `<app-event [datasource]="filteredData" (SyncEvents)="SyncEvents()" (filter)="onFilter($event)" (onTabChange)="onTabChange()" ></app-event>`,
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EventPresenter implements OnInit {
  query: Data.FilterParams
  activeTab: string;
  ds!: EventRange
  filteredData: any;
  constructor(private router: Router,
    private dataFactory: DataFactoryService,
    private service: ModelServiceService,
    private tabStateService: TabStateService) {
    this.ds = new EventRange()
  }

  ngOnInit(): void {
    const status = this.tabStateService.getActiveTab()
    Transformer.ComposeCollectionAsync(this.service.eventJson(status), this.ds.event, EventRangeBuilder);
    this.filteredData = this.ds.event;
  }

  SyncEvents() {
    console.log('clicked syncEvents');
    this.service.syncEvents().subscribe(
      (response) => {
        console.log('Response from syncEvents:', response);
      },
      (error) => {
        console.error('Error occurred while syncing events:', error);
      }
    );
  }

  onFilter(filter: Data.FilterParams) {
    if (filter != null) {
      if (isNaN(filter.year)) {
        filter.year = null;
      }
      this.query = filter;
      this.filteredData = this.filterEvents(this.ds.event, this.query);
    }
  }


  onTabChange(): void {
    // console.log(this.query)
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
