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
  sortAscending: boolean = true;
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
  sortDate() {
    console.log("clicked");
    this.sortAscending = !this.sortAscending;
    this.previousEventsConnection.sort((a, b) => {
      if (this.sortAscending) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }
}
