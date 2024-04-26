import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { headerView } from "./views/header";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { MetaTypeBuilder } from "app/sport-pip-capture/blocks/meta-type.builder";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { TabStateService } from "../event-utility/nav";
import { ArrayBuilder } from "app/sport-pip-capture/blocks/array.builder";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";

@Component({
  selector: "app-header-presenter",
  template: `<app-event-header
    [datasource]="ds"
    (onClear)="onfilter()"
    (allClear)="clearAll()"
    ><app-event-header></app-event-header
  ></app-event-header>`,
  styleUrls: ["./event-header.component.scss"],
})
export class EventHeaderPresenter implements OnInit {
  ds!: headerView;
  status: string;
  @Output() filter = new EventEmitter<Data.FilterParams>();

  constructor(
    private dataFactory: DataFactoryService,
    private tabStateService: TabStateService,
    public modelService: ModelServiceService
  ) {
    this.ds = new headerView();
  }

  ngOnInit(): void {
    Transformer.ComposeObjectAsync(
      this.modelService.MetaTypeByKey("SPORT"),
      this.ds.sports,
      MetaTypeBuilder
    );
    Transformer.ComposeObjectAsync(
      this.modelService.MetaTypeByKey("PROGRAM"),
      this.ds.programs,
      MetaTypeBuilder
    );
    Transformer.ComposeObjectAsync(
      this.modelService.MetaTypeByKey("LEVEL"),
      this.ds.levels,
      MetaTypeBuilder
    );
    Transformer.ComposeObject(
      this.dataFactory.EventYear(),
      this.ds.years,
      ArrayBuilder
    );

    this.ds.programs.onItemSelected((handler) => this.onfilter());
    this.ds.levels.onItemSelected((handler) => this.onfilter());
    this.ds.sports.onItemSelected((handler) => this.onfilter());
    this.ds.years.onItemSelected((handler) => this.onfilter());
    //  this.onfilter()
  }

  onfilter() {
    this.filter.emit({
      level: this.ds.levels.SelectedItem ? this.ds.levels.SelectedItem : null,
      program: this.ds.programs.SelectedItem
        ? this.ds.programs.SelectedItem
        : null,
      sport: this.ds.sports.SelectedItem ? this.ds.sports.SelectedItem : null,
      year: this.ds.years.SelectedItem
        ? parseInt(this.ds.years.SelectedItem)
        : null,
      status: this.tabStateService.getActiveTab(),
    });
  }

  clearAll() {
    this.ds.levels.SelectedItem = null;
    this.ds.programs.SelectedItem = null;
    this.ds.sports.SelectedItem = null;
    this.ds.years.SelectedItem = null;
    const status = this.tabStateService.getActiveTab();
    this.filter.emit({
      level: null,
      program: null,
      sport: null,
      year: null,
      status: status,
    });
  }
}
