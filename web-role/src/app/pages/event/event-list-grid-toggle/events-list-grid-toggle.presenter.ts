import { Component, OnInit } from '@angular/core';
import { EventListGridToggleComponent } from './event-list-grid-toggle.component';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { Transformer } from 'src/app/blocks/transformer';
import { EventsRangeView } from './views/events';
import { Data } from 'src/app/services/models-interfaces/half-stack-interface';
import { EventBuilder } from './builder/event';

@Component({
  selector: 'app-events-list-grid-toggle-presenter',
  standalone: true,
  imports: [EventListGridToggleComponent],
  template: `<app-event-list-grid-toggle [datasource]='ds' 
  (onDelete)="deleteEvent($event)"
  
   (filter)="onFilter($event)"></app-event-list-grid-toggle>`,
  styleUrl: './event-list-grid-toggle.component.scss'
})
export class EventListGridTogglePresenter implements OnInit {

  ds: EventsRangeView;
  filter: Data.DropdownFilter = {
    type: "on-demand"
  };

  constructor(private modelService: ModelService) {
    this.ds = new EventsRangeView();
    this.filter.status = this.ds.activeTab;
  }

  ngOnInit(): void {
    this.listOfevent();
    console.log(this.ds);
  }

  listOfevent() {
    Transformer.ComposeCollectionAsync(this.modelService.eventList(), this.ds.eventView, EventBuilder)
      .then(() => {
        this.onFilter(this.filter)
      })
  }

  onFilter(filter: Data.DropdownFilter): void {
    filter.status = this.ds.activeTab;
    filter.type = "on-demand";
    this.ds.applyFilter(filter)
  }

  deleteEvent(id: number) {
    this.modelService.delete("event", id).subscribe((data) => {
      this.listOfevent();
    });
  }

}
