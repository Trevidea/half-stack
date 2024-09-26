import { Component, OnInit, ViewChild } from "@angular/core";
import { Transformer } from "app/blocks/transformer";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { PasEventView } from "./view/past-event-view";
import { PastEventBuilder } from "./builder/past-event";
import { EventRunnerService } from "app/sport-pip-capture/components/event-runner/event-runner.service";
import { PastConnectionBuilder } from "./builder/connection";
import { ActivatedRoute, Router } from "@angular/router";
import { Views } from "app/sport-pip-capture/models/capture-interface";
import { PresenterAction } from "app/blocks/actions";
import { PastEventViewComponent } from "./past-event-view.component";

@Component({
  selector: 'app-past-event-view-presenter',
  template: `<app-past-event-view #pasteventviewRef [datasource]="ds"  ></app-past-event-view>`,
  styleUrls: ['./past-event-view.component.scss']
})
export class PastEventViewPresenter implements OnInit {
  eventId: number
  modelId: any = "modalVC"
  ds!: PasEventView;
  actions!: Views.FormActions;
  @ViewChild(PastEventViewComponent) pasteventviewRef!: PastEventViewComponent;
  constructor(private modelServiceService: ModelServiceService,
    private route: ActivatedRoute,
    private eventRunnerService: EventRunnerService,
    private router: Router) {
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
        this.eventId = parseInt(params["eventId"])
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