import { Component, EventEmitter, Output } from '@angular/core';
import { PreviousEventsConnectionComponent } from "./previous-events-connection.component";

@Component({
  selector: 'app-previous-events-connection-presenter',
  standalone: true,
  imports: [PreviousEventsConnectionComponent],
  template: `<app-previous-events-connection (start)="startEvent.emit(true)"></app-previous-events-connection>`,
  styleUrl: './previous-events-connection.component.scss'
})
export class PreviousEventsConnectionPresenter {

  @Output() startEvent = new EventEmitter<boolean>();
}
