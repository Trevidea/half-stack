import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '@core/services/event -start.service';

@Component({
  selector: 'app-on-demand-event-sidebar',
  templateUrl: './on-demand-event-sidebar.component.html',
  styleUrls: ['./on-demand-event-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OnDemandEventSidebarComponent implements OnInit {

  constructor(private router: Router, private event: EventService) {}

  ngOnInit(): void {
  }
  onStartClick(): void {
   
    this.event.setEventStarted(true);
    this.router.navigate(['/connection']);
  }
}
