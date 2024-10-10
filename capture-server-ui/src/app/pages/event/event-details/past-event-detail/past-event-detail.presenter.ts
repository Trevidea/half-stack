import { Component, Input, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { PastEventDetailComponent } from './past-event-detail.component';
import { Transformer } from 'src/app/blocks/transformer';
import { EventsDetailRangeView } from '../views/event-detail';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { EventDetailsBuilder } from '../builders/event-detail';

@Component({
  selector: 'app-past-event-detail-presenter',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, PastEventDetailComponent],
  template: `<app-past-event-detail [datasource]='ds' [startIndex]="currentIndex" [endIndex]="endIndex"
  (page)="onPageChange($event)"></app-past-event-detail>`,
  styleUrl: './past-event-detail.component.scss'
})
export class PastEventDetailPresenter implements OnInit {
  ds!: EventsDetailRangeView;
  @Input() selectedEventId: number = 0;
  currentIndex: number;
  endIndex: number;

  constructor(private modelService: ModelService) {
    this.ds = new EventsDetailRangeView();
  }

  ngOnInit(): void {
    this.listOfevent();
  }

  listOfevent() {
    // Transformer.ComposeCollectionAsync(this.modelService.getEventsByStatus('past'), this.ds.eventViewCollection, EventDetailsBuilder)
    //   .then(() => {
    //     if (this.selectedEventId) {
    //       this.currentIndex = this.ds.eventViewCollection.findIndex(event => event.id === this.selectedEventId);
    //     }
    //   });
  }


  onPageChange(e) {
    this.currentIndex = e.pageIndex;
  }

}
