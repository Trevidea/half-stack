import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-event-filter',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TablerIconsModule,],
  templateUrl: './event-filter.component.html',
  styleUrl: './event-filter.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventFilterComponent implements OnInit {
  @Input() datasource !: any;
  @Output() onClear = new EventEmitter();
  @Output() allClear = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event): void { }

  clearFilter(filter: string): void {
    this.datasource[filter].SelectedItem = null;
    this.onClear.emit();
  }

  isAnyItemSelected(): boolean {
    return this.datasource?.programs.SelectedItem || this.datasource?.levels.SelectedItem || this.datasource?.years.SelectedItem || this.datasource?.sports.SelectedItem;
  }

}
