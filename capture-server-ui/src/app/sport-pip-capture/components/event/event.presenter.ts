import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { EventRange } from "./views/event";
import { Transformer } from "app/blocks/transformer";
import { EventRangeBuilder } from "./builders/event";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { Data } from "app/sport-pip-capture/models/capture-interface";
import { TabStateService } from "./event-utility/nav";

@Component({
  selector: "app-event-presenter",
  template: `<app-event
    [datasource]="filteredData | appFilter : searchItem"
    (filter)="onFilter($event)"
    (onTabChange)="onTabChange()"
    (deleteEvent)="onDeleteEvent($event)"
  ></app-event>`,
  styleUrls: ["./event.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventPresenter implements OnInit {
  query: Data.FilterParams = {
    sport: null,
  };
  activeTab: string;
  ds!: EventRange;
  filteredData!: any;
  progress: number = 0;
  searchItem: string;
  constructor(
    private service: ModelServiceService,
    private tabStateService: TabStateService
  ) {
    this.ds = new EventRange();
  }

  ngOnInit(): void {
    this.loadEventsList();
  }

  loadEventsList() {
    Transformer.ComposeCollectionAsync(
      this.service.eventList(),
      this.ds.event,
      EventRangeBuilder
    ).then(() => {
      this.query.status = this.tabStateService.getActiveTab();
      this.filteredData = this.filterEvents(this.ds.event, this.query);
    });
  }


  onFilter(filter: Data.FilterParams) {
    setTimeout(() => {
      this.query = filter;
      this.filteredData = this.filterEvents(this.ds.event, this.query);
    }, 0);
  }

  onTabChange(): void {
    this.query.status = this.tabStateService.getActiveTab();
    this.onFilter(this.query);
  }

  filterEvents(data, query) {
    return data.filter((item) => {
      for (const key in query) {
        if (query[key] !== null && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  onDeleteEvent(eventId: number) {
    this.service.delete("event", eventId).subscribe((data) => {
      this.loadEventsList();
    });
  }

}
