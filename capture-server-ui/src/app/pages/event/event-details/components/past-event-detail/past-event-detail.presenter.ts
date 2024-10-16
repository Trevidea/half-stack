import { Component, Input, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { PastEventDetailComponent } from './past-event-detail.component';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { ActivatedRoute } from '@angular/router';
import { PasEventView } from '../../views/past-event-view';
import { Transformer } from 'src/app/blocks/transformer';
import { PastEventBuilder } from '../../builders/past-event';
import { EventRunnerService } from 'src/app/services/event-runner/event-runner.service';


@Component({
  selector: 'app-past-event-detail-presenter',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, PastEventDetailComponent],
  template: `<app-past-event-detail [datasource]="ds"></app-past-event-detail>`,
  styleUrl: './past-event-detail.component.scss'
})
export class PastEventDetailPresenter implements OnInit {
  ds!: PasEventView;
  eventId: number
  constructor(private modelService: ModelService, private route: ActivatedRoute, private eventRunnerService: EventRunnerService,) {
    this.ds = new PasEventView();
    this.route.params.subscribe(params => {
      this.eventId = params['id']
      this.ds.id = params['id'];
    });
    this.eventRunnerService.startedEventId$.subscribe(
      (res) => {
        if (res) {
          this.eventId = res;
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.eventId) {
      Transformer.ComposeObjectAsync(
        this.modelService.getSpecificPastEvent(this.eventId),
        this.ds,
        PastEventBuilder
      );
    }
  }


}
