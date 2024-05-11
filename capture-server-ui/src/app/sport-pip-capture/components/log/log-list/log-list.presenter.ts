import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { LogRangeView, LogView } from "../views/log";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { EventRangeBuilder } from "../builder/log";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { UI } from "app/blocks/ui-utils";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-log-presenter",
  template: `<app-log-list
    [datasource]="ds"
    [users]="users"
    [categories]="categories"
    [logKeys]="logKeys"
    (filterChild)="filter($event)"
  ></app-log-list>`,
  styleUrls: ["../log.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogListPresentert implements OnInit {
  ds!: LogRangeView;
  users: string[] = [];
  userSet = new Set<string>();
  categories: string[] = [];
  categorySet = new Set<string>();
  logKeys: string[] = [];
  constructor(
    private dataService: DataFactoryService,
    private modelServiceService: ModelServiceService,
    private http: HttpClient
  ) {
    this.ds = new LogRangeView();
  }

  ngOnInit(): void {
    this.populate();
  }

  filter(e) {
    if (e == false) {
      this.ds.category = null;
      this.ds.dateRangeFrom = null;
      this.ds.dateRangeTo = null;
      this.ds.user = null;
      this.populate();
    } else {
      this.populateFilterData();
    }
  }

  populateFilterData() {
    Transformer.ComposeCollectionAsync(
      this.dataService.Logs({
        category: this.ds.category,
        user: this.ds.user,
        startDate: UI.DateHelper.dateToString(
          this.ds.dateRangeFrom,
          "yyyy-mm-dd"
        ),
        endDate: UI.DateHelper.dateToString(this.ds.dateRangeTo, "yyyy-mm-dd"),
      }),
      this.ds.logs,
      EventRangeBuilder
    );
  }
  populate() {
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
