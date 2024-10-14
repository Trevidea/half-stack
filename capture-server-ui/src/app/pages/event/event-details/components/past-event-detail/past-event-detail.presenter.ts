import { Component, Input, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { PastEventDetailComponent } from './past-event-detail.component';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { ActivatedRoute } from '@angular/router';
import { PasEventView } from '../../views/past-event-view';
import { Transformer } from 'src/app/blocks/transformer';
import { PastEventBuilder } from '../../builders/past-event';


@Component({
  selector: 'app-past-event-detail-presenter',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, PastEventDetailComponent],
  template: `<app-past-event-detail [datasource]="ds"></app-past-event-detail>`,
  styleUrl: './past-event-detail.component.scss'
})
export class PastEventDetailPresenter implements OnInit {
  ds!: PasEventView;

  constructor(private modelService: ModelService, private route: ActivatedRoute,) {
    this.ds = new PasEventView();
    this.route.params.subscribe(params => {
      this.ds.id = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.ds.id) {
      Transformer.ComposeObjectAsync(
        this.modelService.getSpecificPastEvent(this.ds.id),
        this.ds,
        PastEventBuilder
      );
    }
  }


}
