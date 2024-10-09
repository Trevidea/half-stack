import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Data } from 'src/app/services/models-interfaces/half-stack-interface';
import { OngoingEventGridComponent } from "./grid-components/ongoing-event-grid/ongoing-event-grid.component";
import { UpcomingEventGridComponent } from "./grid-components/upcoming-event-grid/upcoming-event-grid.component";
import { PastEventGridComponent } from "./grid-components/past-event-grid/past-event-grid.component";
import { EventFilterPresenter } from "./event-filter/event-filter.presenter";

@Component({
  selector: 'app-event-list-grid-toggle',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    OngoingEventGridComponent,
    UpcomingEventGridComponent,
    PastEventGridComponent,
    EventFilterPresenter
  ],
  templateUrl: './event-list-grid-toggle.component.html',
  styleUrl: './event-list-grid-toggle.component.scss'
})
export class EventListGridToggleComponent {
  query: Data.DropdownFilter = {};
  tabs = [
    { id: 'on-going', label: 'Ongoing Events' },
    { id: 'upcoming', label: 'Upcoming Events' },
    { id: 'past', label: 'Past Events' }
  ];

  @Input() datasource: any;
  @Output() filter = new EventEmitter<Data.DropdownFilter>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  startIndex: number = 0;
  pageSize: number = 10;
  endIndex: number = this.pageSize - 1;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  
  onTabChange(tabId: string) {
    this.datasource.activeTab = tabId;
    this.filter.emit(this.query);
  }

  onfilterChange(filter: Data.DropdownFilter) {
    this.query = filter
    this.filter.emit(this.query);
  }
}
