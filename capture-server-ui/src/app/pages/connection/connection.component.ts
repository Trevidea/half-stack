import { Component, Input } from '@angular/core';
import { PreviousEventsConnectionPresenter } from "./previous-events-connection/previous-events-connection.presenter";
import { Router, RouterOutlet } from '@angular/router';
import { EventRunnerService } from 'src/app/services/event-runner/event-runner.service';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [PreviousEventsConnectionPresenter, RouterOutlet],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss'
})
export class ConnectionComponent {
  @Input() datasource: any;
  previousEventsConnection: any;
  isEventStarted: boolean =true;
  _isEventStarted(e: boolean) {
    this.isEventStarted = e;
  }

  constructor(private router: Router, private eventRunnerService: EventRunnerService,) {
    // this.previousEventsConnection = PreviousEventsConnection;
    this.eventRunnerService.isEventStarted$.subscribe(
      (res) => {
        console.log(res);
        this.isEventStarted = res;
      }
    );
  }
}
