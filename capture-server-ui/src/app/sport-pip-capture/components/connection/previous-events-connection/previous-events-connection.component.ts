import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { PreviousEventsConnection } from "./data";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

@Component({
  selector: "app-previous-events-connection",
  templateUrl: "./previous-events-connection.component.html",
  styleUrls: ["./previous-events-connection.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PreviousEventsConnectionComponent implements OnInit {
  @Output() startEvent = new EventEmitter<boolean>();
  @Input() datasource: any;
  @Input() previousEventsConnection: any;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  sortAscending: boolean[] = [];
  private tempData = [];
  public selected = [];
  public rows: any;
  constructor(
    private dataFactory: DataFactoryService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.dataFactory.read("connection-with-past-details").subscribe(
      (res: any) => {
        // console.log(res)
        this.rows = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  header = [
    { name: "Name Of Event", sort: true },
    { name: "Date", sort: true },
    { name: "Total Connection", sort: true },
    { name: "Duration", sort: true },
    { name: "Most Connected Device", sort: false },
  ];
  sortedStarted: boolean[] = [];
  sortData(column: any, index: number) {
    console.log("clicked");
    this.sortAscending[index] = !this.sortAscending[index];
    this.sortedStarted[index] = true;
    this.header.forEach((data, i) => {
      if (i == index) {
        this.sortedStarted[index] = true;
      } else {
        this.sortedStarted[i] = false;
      }
    });
    switch (column.name) {
      case "Date":
        this.dateSort(this.previousEventsConnection, index);
        break;
      case "Name Of Event":
        this.stringSort(this.previousEventsConnection, index, true);
        break;
      default:
    }
  }
  dateSort(data, index) {
    data.sort((a, b) => {
      if (this.sortAscending[index]) {
        const data = new Date(a.date).getTime() - new Date(b.date).getTime();
        return data;
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }
  stringSort(data, index, ascending: boolean) {
    data.sort((a, b) => {
      const nameA = (a["Name of event"] || "").toUpperCase();
      const nameB = (b["Name of event"] || "").toUpperCase();

      const sortOrder = ascending ? 1 : -1;

      if (nameA < nameB) {
        return -1 * sortOrder;
      }
      if (nameA > nameB) {
        return 1 * sortOrder;
      }
      return 0;
    });
  }
}
