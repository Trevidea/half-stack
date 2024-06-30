import { Component, OnInit } from "@angular/core";
import { Transformer } from "app/blocks/transformer";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { PasEventView } from "./view/past-event-view";
import { PastEventBuilder } from "./builder/past-event";
import { EventRunnerService } from "app/sport-pip-capture/components/event-runner/event-runner.service";
import { PastConnectionBuilder } from "./builder/connection";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-past-event-view-presenter',
  template: `<app-past-event-view [datasource]="ds"></app-past-event-view>`,
  styleUrls: ['./past-event-view.component.scss']
})
export class PastEventViewPresenter implements OnInit {
  eventId: number
  ds!: PasEventView;

  constructor(private modelServiceService: ModelServiceService,
    private route: ActivatedRoute,
    private eventRunnerService: EventRunnerService) {
    this.ds = new PasEventView();
    this.eventRunnerService.startedEventId$.subscribe(
      (res) => {
        if (res) {
          this.eventId = res;
        }
      }
    );

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params["eventId"]
      if (id) {
        this.eventId = params["eventId"];
      }
    });

    if (this.eventId) {
      Transformer.ComposeObjectAsync(
        this.modelServiceService.getSpecificPastEvent(this.eventId),
        this.ds,
        PastEventBuilder
      );

    }
  }
}