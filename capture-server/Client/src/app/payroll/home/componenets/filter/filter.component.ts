import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SelectStringItemView } from 'src/app/blocks/collection-item';
import { FilterBase } from 'src/app/payroll/main-table/filters/filter-base';
import { CustomAdapter, CustomDateParserFormatter } from '../ngb-date-converter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class FilterComponent implements OnInit {
  @Input() filter: FilterBase
  @Output() refresh = new EventEmitter();
  filterAppliedCallback = (item: { selectedItem: SelectStringItemView }) => {
    this.refresh.emit(item.selectedItem.value);
  }

  onClearSelection() {
    this.filter.datasource.SelectedItem = null;
    this.refresh.emit();
  }
  constructor() {
  }
  onDateChange(e) {
    this.refresh.emit();
  }
  onDateFilterclear() {
    this.filter

  }
  ngOnchange() {

    this.refresh.emit();
  }
  ngOnInit(): void {
    this.filter.datasource.onItemSelected(this.filterAppliedCallback);
  }

}
