import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { EventRange } from './views/event';
import { Transformer } from 'app/blocks/transformer';
import { EventRangeBuilder, PastEventBuilder, UpcomingEventBuilder } from './builders/event';
import { ArrayBuilder } from 'app/sport-pip-capture/blocks/array.builder';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { Data } from 'app/sport-pip-capture/models/capture-interface';
import { TabStateService } from './event-utility/nav';

@Component({
  selector: 'app-event-presenter',
  template: `<app-event [datasource]="ds" (SyncEvents)="SyncEvents()" (filter)="onFilter($event)" (onTabChange)="onTabChange()" ></app-event>`,
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EventPresenter implements OnInit {
  query: Data.FilterParams
  activeTab:string;
  ds!: EventRange
  constructor(private router: Router,
    private dataFactory: DataFactoryService,
    private service: ModelServiceService,
    private tabStateService: TabStateService) {
    this.ds = new EventRange()
  }

  ngOnInit(): void {
    Transformer.ComposeCollectionAsync(this.service.eventJson(), this.ds.ongoingEvent, EventRangeBuilder);
    // let data= this.service.eventJson();
    console.log(this.ds.ongoingEvent)
    // Transformer.ComposeCollectionAsync(this.dataFactory.ongoingEventJson(), this.ds.ongoingEvent, EventRangeBuilder);
    // Transformer.ComposeCollectionAsync(this.dataFactory.UpCommingEventJson(), this.ds.upcomingEvent, UpcomingEventBuilder);
    // Transformer.ComposeCollectionAsync(this.dataFactory.PastEventJson(), this.ds.pastEvent, PastEventBuilder);
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
    console.log(filter)
  }

  filterDataByActiveTab(): void {
    switch (this.activeTab) {
      case 'ongoing': {
        
       
        break;
      }

      case 'upcoming':

        break;
      case 'past':

        break;
      default:
        break;
    }
  }

  onTabChange(): void {
    this.activeTab = this.tabStateService.getActiveTab()
   
  }


}
