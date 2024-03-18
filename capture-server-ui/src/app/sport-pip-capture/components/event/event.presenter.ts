import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { EventRange } from './views/event';
import { Transformer } from 'app/blocks/transformer';
import { EventRangeBuilder, PastEventBuilder, UpcomingEventBuilder } from './builders/event';
import { ArrayBuilder } from 'app/sport-pip-capture/blocks/array.builder';

@Component({
  selector: 'app-event-presenter',
  template: `<app-event [datasource]="ds"></app-event>`,
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventPresenter implements OnInit {

  activeTab: string = 'ongoing'; 
  ds!: EventRange
  constructor(private router: Router, private dataFactory: DataFactoryService) {
    this.ds = new EventRange()
  }

  ngOnInit(): void {
   
  }

  filterDataByActiveTab(): void {
    switch (this.activeTab) {
      case 'ongoing':
        Transformer.ComposeCollectionAsync(this.dataFactory.ongoingEventJson(), this.ds.ongoingEvent,EventRangeBuilder);
        break;
      case 'upcoming':
        Transformer.ComposeCollectionAsync(this.dataFactory.UpCommingEventJson(), this.ds.upcomingEvent,UpcomingEventBuilder);
        break;
      case 'past':
        Transformer.ComposeCollectionAsync(this.dataFactory.PastEventJson(), this.ds.pastEvent,PastEventBuilder);
        break;
      default:
        break;
    }
  }

 
  onTabChange(tabName: string): void {
    this.activeTab = tabName;
    this.filterDataByActiveTab();
  }
}
