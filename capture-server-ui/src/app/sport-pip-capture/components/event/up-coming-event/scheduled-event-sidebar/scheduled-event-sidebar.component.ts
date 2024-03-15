import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '@core/services/event -start.service';

@Component({
  selector: 'app-scheduled-event-sidebar',
  templateUrl: './scheduled-event-sidebar.component.html',
  styleUrls: ['./scheduled-event-sidebar.component.scss']
})
export class ScheduledEventSidebarComponent implements OnInit {

 
  constructor(private router: Router, private event: EventService) {}

  ngOnInit(): void {
  }
  onStartClick(): void {
    
    this.event.setEventStarted(true);
    this.router.navigate(['/connection']);
  }

}
