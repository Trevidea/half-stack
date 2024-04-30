import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { LogRangeView, LogView } from "./views/log";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { EventRangeBuilder } from "./builder/log";
import { Data } from "app/sport-pip-capture/models/capture-interface";

@Component({
  selector: "app-log-presenter",
  template: `<app-log
    [datasource]="ds"
    [users]="users"
    [categories]="categories"
    [logKeys]="logKeys"
  ></app-log>`,
  styleUrls: ["./log.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogPresentert implements OnInit {
  ds!: LogRangeView;
  users: string[] = [];
  userSet = new Set<string>();
  categories: string[] = [];
  categorySet = new Set<string>();
  logKeys: string[] = [];
  constructor(private dataService: DataFactoryService) {
    this.ds = new LogRangeView();
  }

  ngOnInit(): void {
    Transformer.ComposeCollectionAsync(
      this.dataService.Logs(),
      this.ds.logs,
      EventRangeBuilder
    ).then((logs: Data.Log[]) => {
      logs.forEach((item) => {
        if (!this.userSet.has(item.user)) {
          this.users.push(item.user);
          this.userSet.add(item.user);
        }
      });
      logs.forEach((item) => {
        if (!this.categorySet.has(item.category)) {
          this.categories.push(item.category);
          this.categorySet.add(item.category);
        }
      });
      logs.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (!this.logKeys.includes(key)) {
            this.logKeys.push(key);
          }
        });
      });
    });
  }
}
