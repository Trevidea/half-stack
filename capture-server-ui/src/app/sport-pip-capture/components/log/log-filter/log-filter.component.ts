import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbDateCustomParserFormatter } from "./datepicker.adapter";

@Component({
  selector: "app-log-filter",
  templateUrl: "./log-filter.component.html",
  styleUrls: ["./log-filter.component.scss"],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LogFilterComponent implements OnInit {
  @Input() categories: any;
  @Input() users: any;
  @Input() datasource: any;
  @Output() inputValueChange = new EventEmitter<string>();
  @Output() filterKeys = new EventEmitter<string>();
  @Output() filter = new EventEmitter<boolean>();
  searchText(value: string) {
    this.inputValueChange.emit(value);
  }
  onInputChange(event: Event) {
    this.inputValueChange.emit("");
  }
  constructor() {}
  ngOnInit(): void {}
}
