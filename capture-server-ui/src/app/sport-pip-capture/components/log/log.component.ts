import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogComponent implements OnInit {
  @Input() datasource: any;
  @Input() users: any;
  @Input() categories: any;
  @Input() logKeys: any;
  searchText: string = "";

  constructor() {}

  ngOnInit(): void {}
  arrowDirection: number[] = [];
  currentSortColumn: string | null = null;
  isAscending: boolean = true;
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
}
