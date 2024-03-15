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

  ds!: EventRange
  constructor(private router: Router, private dataFactory: DataFactoryService) {
    this.ds = new EventRange()
  }

  ngOnInit(): void {
    Transformer.ComposeObject(this.dataFactory.EventSports(), this.ds.sports, ArrayBuilder)
    Transformer.ComposeObject(this.dataFactory.EventLevel(), this.ds.levels, ArrayBuilder)
    Transformer.ComposeObject(this.dataFactory.EventProgram(), this.ds.programs, ArrayBuilder)
    Transformer.ComposeObject(this.dataFactory.EventYear(), this.ds.years, ArrayBuilder)

    Transformer.ComposeCollectionAsync(this.dataFactory.PastEventJson(), this.ds.pastEvent,PastEventBuilder);
    Transformer.ComposeCollectionAsync(this.dataFactory.UpCommingEventJson(), this.ds.upcomingEvent,UpcomingEventBuilder);
    Transformer.ComposeCollectionAsync(this.dataFactory.ongoingEventJson(), this.ds.ongoingEvent,EventRangeBuilder);
    
  }

}
