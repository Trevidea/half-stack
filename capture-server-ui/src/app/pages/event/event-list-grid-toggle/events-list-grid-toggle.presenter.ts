import { Component, OnInit } from '@angular/core';
import { EventListGridToggleComponent } from './event-list-grid-toggle.component';

@Component({
  selector: 'app-events-list-grid-toggle-presenter',
  standalone: true,
  imports: [EventListGridToggleComponent],
  template: `<app-event-list-grid-toggle></app-event-list-grid-toggle>`,
  styleUrl: './event-list-grid-toggle.component.scss'
})
export class EventListGridTogglePresenter implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // ds: EventsRangeView;
  // filter: Data.DropdownFilter = {
  //   type: "scheduled"
  // };

  // constructor(private modelService: ModelService) {
  //   this.ds = new EventsRangeView();
  //   this.filter.status = this.ds.activeTab;
  // }

  // ngOnInit(): void {
  //   this.listOfevent();
  // }

  // listOfevent() {
  //   Transformer.ComposeCollectionAsync(this.modelService.eventList(), this.ds.eventView, EventBuilder)
  //     .then(() => {
  //       this.onFilter(this.filter)
  //     })
  // }

  // onFilter(filter: Data.DropdownFilter): void {
  //   filter.status = this.ds.activeTab;
  //   filter.type = "scheduled";
  //   this.ds.applyFilter(filter)
  // }

  // deleteEvent(id: number) {
  //   this.modelService.delete("event", id).subscribe((data) => {
  //     this.listOfevent();
  //   });
  // }

}
