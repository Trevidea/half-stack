import { DatePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

@Component({
  selector: "app-log-list",
  templateUrl: "./log-list.component.html",
  styleUrls: ["../log.component.scss"],

  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class LogListComponent implements OnInit {
  @Input() datasource: any;
  @Input() users: any;
  @Input() categories: any;
  @Input() logKeys: any;
  @Output() filterChild = new EventEmitter<boolean>();
  arrowDirection: number[] = [];
  currentSortColumn: string | null = null;
  isAscending: boolean = true;
  searchText: string = "";

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("detailIndex")) {
      const detailIndex = param.get("detailIndex");
      this.rowIndex = detailIndex;
      setTimeout(() => {
        this.logDetail(detailIndex);
      }, 100);
    }
  }

  toggleArrow(column: string, index: number) {
    // this.arrowDirection[i] = this.arrowDirection[i] === 0 ? 180 : 0;
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }
    this.arrowDirection = Array(this.logKeys.length).fill(0);
    this.arrowDirection[index] = this.isAscending ? 180 : 0;
    this.datasource.logs.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return this.isAscending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return this.isAscending ? aValue - bValue : bValue - aValue;
      }
    });
  }

  onInputValueChange(value: string) {
    this.searchText = value;
  }
  rowData: any;
  rowIndex: any;
  logDetail(index) {
    this._coreSidebarService.getSidebarRegistry(`log-detail`).toggleOpen();
    this.rowIndex = index;
    this.rowData = this.datasource.logs.filter((d, i) => {
      if (i == index) {
        return d;
      }
    });
  }
  changeRequest(ind) {
    this.rowIndex = ind;
    this.rowData = this.datasource.logs.filter((d, i) => {
      if (i == ind) {
        return d;
      }
    });
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const format = "dd MMMM yyyy 'at' h:mm a";
    return this.datePipe.transform(date, format) || "";
  }
  filter(e) {
    this.filterChild.emit(e);
  }
}
