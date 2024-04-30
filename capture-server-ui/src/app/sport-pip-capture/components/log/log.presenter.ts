import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { LogRangeView, LogView } from "./views/log";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { EventRangeBuilder } from "./builder/log";

@Component({
  selector: "app-log-presenter",
  template: `<app-log [datasource]="ds"></app-log>`,
  styleUrls: ["./log.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogPresentert implements OnInit {
  ds!: LogRangeView;
  constructor(private dataService: DataFactoryService) {
    this.ds = new LogRangeView();
  }

  ngOnInit(): void {
    Transformer.ComposeCollectionAsync(
      this.dataService.Logs(),
      this.ds.logs,
      EventRangeBuilder
    );
  }
}
