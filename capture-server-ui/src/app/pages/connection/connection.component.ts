import { Component } from '@angular/core';
import { PreviousEventsConnectionPresenter } from "./previous-events-connection/previous-events-connection.presenter";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [PreviousEventsConnectionPresenter,RouterOutlet],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss'
})
export class ConnectionComponent {

  isEventStarted: boolean;
 _isEventStarted(e: boolean) {
    console.log(e);
    this.isEventStarted = e;
  }
}
