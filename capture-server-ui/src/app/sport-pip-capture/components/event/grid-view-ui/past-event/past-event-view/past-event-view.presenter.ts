import { Component, OnInit } from "@angular/core";
import { Transformer } from "app/blocks/transformer";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { PasEventView } from "./view/past-event-view";
import { PastEventBuilder } from "./builder/past-event";
import { EventRunnerService } from "app/sport-pip-capture/components/event-runner/event-runner.service";
import { PastConnectionBuilder } from "./builder/connection";

@Component({
  selector: 'app-past-event-view-presenter',
  template: `<app-past-event-view [datasource]="ds"></app-past-event-view>`,
  styleUrls: ['./past-event-view.component.scss']
})
export class PastEventViewPresenter implements OnInit {
  eventId: number
  ds!: PasEventView;

  constructor(private modelServiceService: ModelServiceService, private eventRunnerService: EventRunnerService) {
    this.eventRunnerService.startedEventMetaData$.subscribe(
      (res) => {
        console.log(res);

      }
    );
    this.ds = new PasEventView();
  }

  ngOnInit(): void {

    Transformer.ComposeCollectionAsync(
      this.modelServiceService.eventConnectionJsonById(310),
      this.ds.connectionDetailsView,
      PastConnectionBuilder
    )

    if (this.eventId) {
      Transformer.ComposeObjectAsync(
        this.modelServiceService.eventJson(this.eventId),
        this.ds,
        PastEventBuilder
      );


    }
  }
}