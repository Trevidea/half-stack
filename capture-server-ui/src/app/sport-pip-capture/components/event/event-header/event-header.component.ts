import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";


@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHeaderComponent implements OnInit {
  @Input() datasource: any
  @Output() onClear = new EventEmitter();
  @Output() allClear = new EventEmitter();
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.datasource)
  }

  isAnyItemSelected(): boolean {
    return this.datasource.levels.SelectedItem || this.datasource.programs.SelectedItem || this.datasource.sports.SelectedItem || this.datasource.years.SelectedItem;
  }

}
