import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-log-filter",
  templateUrl: "./log-filter.component.html",
  styleUrls: ["./log-filter.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogFilterComponent implements OnInit {
  @Input() categories: any;
  @Input() users: any;
  constructor() {}
  ngOnInit(): void {}
}
