import { Component, Input, OnInit } from '@angular/core';
import { OngoingEventDetailComponent } from './ongoing-event-detail.component';
import { Transformer } from 'src/app/blocks/transformer';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { EventsDetailRangeView } from '../views/event-detail';
import { EventDetailsBuilder } from '../builders/event-detail';

@Component({
  selector: 'app-ongoing-event-detail-presenter',
  standalone: true,
  imports: [OngoingEventDetailComponent],
  template: `<app-ongoing-event-detail [datasource]='ds' [startIndex]="currentIndex" [endIndex]="endIndex"
  (page)="onPageChange($event)"
  ></app-ongoing-event-detail>`,
  styleUrl: './ongoing-event-detail.component.scss'
})
export class OngoingEventDetailPresenter implements OnInit {
  ds!: EventsDetailRangeView;
  @Input() selectedEventId: number = 0;
  currentIndex: number;
  endIndex: number;
  @Input() eventId: number = 0;
  constructor(private modelService: ModelService) {
    this.ds = new EventsDetailRangeView();
  }

  ngOnInit(): void {
    this.listOfevent();
  }


  listOfevent() {
    // if (this.eventId) {
    //   Transformer.ComposeObjectAsync(this.modelService.eventJson(this.eventId), this.ds, EventDetailsBuilder).then(
    //     () => {

    //     }
    //   );
    //   console.log(this.ds)
    // }
  }


  onPageChange(e) {
    this.currentIndex = e.pageIndex;
  }
}
