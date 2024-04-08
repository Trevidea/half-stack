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
    { name: "Name Of Event", sort: true, sortDirection: null },
    { name: "Date", sort: true, sortDirection: null },
    { name: "Total Connection", sort: true, sortDirection: null },
    { name: "Duration", sort: true, sortDirection: null },
    { name: "Most Connected Device", sort: false, sortDirection: null },
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
        this.stringSort(this.previousEventsConnection, index, "Name of event");
        break;
      case "Date":
        this.stringSort(this.previousEventsConnection, index, "date");
        break;
      case "Total Connection":
        this.numberSort(
          this.previousEventsConnection,
          index,
          "Total connection"
        );
        break;
      case "Duration":
        this.stringSort(this.previousEventsConnection, index, "Duration");
        break;
      default:
    }
  }
  dateSort(data: any[], index: number) {
    data.sort((a, b) => {
      if (this.sortAscending[index]) {
        const data = new Date(a.date).getTime() - new Date(b.date).getTime();
        return data;
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }
  stringSort(data: any[], index: number, property: string) {
    const ascending = this.sortAscending[index];
    data.sort((a, b) => {
      const nameA = (a[property] || "").toUpperCase();
      const nameB = (b[property] || "").toUpperCase();

      if (nameA < nameB) {
        return ascending ? -1 : 1;
      }
      if (nameA > nameB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
  }
  numberSort(data: any[], index: number, property: string) {
    const ascending = this.sortAscending[index];
    data.sort((a, b) => {
      const valueA = Number(a[property]);
      const valueB = Number(b[property]);

      if (isNaN(valueA) || isNaN(valueB)) {
        // Handle cases where the value is not a valid number
        return 0;
      }

      if (valueA < valueB) {
        return ascending ? -1 : 1;
      }
      if (valueA > valueB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
  }
}
