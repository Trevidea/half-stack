import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { Transformer } from "app/blocks/transformer";
import { OnDemandEventFormView } from "./views/onDemand";
import { ArrayBuilder } from "app/sport-pip-capture/blocks/array.builder";
import { Data, Views } from "app/sport-pip-capture/models/capture-interface";
import { PresenterAction } from "app/blocks/actions";
import { ActivatedRoute, Router } from "@angular/router";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { EventBuilder } from "./buliders/event";
import { MetaTypeBuilder } from "app/sport-pip-capture/blocks/meta-type.builder";
import { TypesPresenter } from "app/sport-pip-capture/blocks/types/types.presenter";
@Component({
  selector: "app-create-on-demand-event-presenter",
  template: `<app-create-on-demand-event
    [datasource]="ds"
    (save)="actions.onSave()"
    (cancel)="actions.onCancel()"
  ></app-create-on-demand-event>`,
  styleUrls: ["./create-on-demand-event.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CreateOnDemandEventPresenter implements OnInit {
  ds!: OnDemandEventFormView;
  eventId: number;
  // ondemandEvent: Data.OnDemandEvent = {
  //   event_id: 0,
  //   owner_id: 0,
  //   id: 0
  // };

  actions!: Views.FormActions;
  public selectBasic: any[] = [];
  public selectBasicLoading = false;

  constructor(
    private dataFactory: DataFactoryService,
    private router: Router,
    private route: ActivatedRoute,
    private modelServiceService: ModelServiceService
  ) {
    this.ds = new OnDemandEventFormView();
    if (Object.is(route.snapshot.component, this.constructor))
      this.ds.id = route.snapshot.params["id"];

    this.actions = new PresenterAction(
      "event",
      this.ds,
      this.modelServiceService.saveEvent,
      EventBuilder,
      router
    );
    this.actions.data.subscribe((data: any) => {
      if (data) {
        let ondemandEvent = { event_id: data.id, owner_id: 1 };
        this.saveDemand(ondemandEvent);
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.eventId = parseInt(params["id"]);
    });
    // MetaTypeJson
    Transformer.ComposeObjectAsync(
      this.dataFactory.MetaTypeByKey("PROGRAM"),
      this.ds.programs,
      MetaTypeBuilder
    );
    Transformer.ComposeObjectAsync(
      this.dataFactory.MetaTypeByKey("SPORT"),
      this.ds.sports,
      MetaTypeBuilder
    );
    Transformer.ComposeObjectAsync(
      this.dataFactory.MetaTypeByKey("LEVEL"),
      this.ds.levels,
      MetaTypeBuilder
    );
    // Transformer.ComposeObject(
    //   this.dataFactory.EventLevel(),
    //   this.ds.levels,
    //   ArrayBuilder
    // );

    Transformer.ComposeObject(
      this.dataFactory.EventYear(),
      this.ds.years,
      ArrayBuilder
    );

    if (this.eventId) {
      Transformer.ComposeObjectAsync(
        this.modelServiceService.eventJson(this.eventId),
        this.ds,
        EventBuilder
      ).then(() => {});
    }

    this.ds.sports.onAddingNewItem(async (e: { modal: Views.ModalHost }) => {
      e.modal.component = TypesPresenter;
      e.modal.properties["key"] = "SPORT";
      try {
        const data = await e.modal.open();
        if (data) {
          Transformer.ComposeAndSelect(this.ds.sports, data.newItem);
        }
      } catch (err) {
        console.log(err);
      }
    });

    this.ds.programs.onAddingNewItem(async (e: { modal: Views.ModalHost }) => {
      e.modal.component = TypesPresenter;
      e.modal.properties["key"] = "PROGRAM";

      try {
        const data = await e.modal.open();
        if (data) {
          Transformer.ComposeAndSelect(this.ds.programs, data.newItem);
        }
      } catch (err) {
        console.log(err);
      }
    });
    this.ds.levels.onAddingNewItem(async (e: { modal: Views.ModalHost }) => {
      e.modal.component = TypesPresenter;
      e.modal.properties["key"] = "LEVEL";
      try {
        const data = await e.modal.open();
        if (data) {
          Transformer.ComposeAndSelect(this.ds.levels, data.newItem);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  // formatTime(time: any): number {
  //   if (!time) return 0;
  //   const [hours, minutes] = time.split(':');
  //   let formattedTime = hours + minutes;
  //   return parseInt(formattedTime);
  // }

  ////just for testing ///////
  saveDemand(data: { event_id: number; owner_id: number }) {
    const requestData = {
      table: "ondemandevent",
      columns: [
        {
          field: "event_id",
          type: 0,
          value: data.event_id,
        },
        {
          field: "owner_id",
          type: 0,
          value: data.owner_id,
        },
      ],
      criteria: [
        {
          field: "id",
        },
      ],
    };
    this.modelServiceService._saveOnDemandEvent(requestData).subscribe(
      (response) => {},
      (error) => {
        console.error("Error saving data:", error);
        // Handle error
      }
    );
  }
}
