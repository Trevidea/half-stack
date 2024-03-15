import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { EventService } from '@core/services/event -start.service';

@Component({
  selector: 'app-scheduled-event-card',
  templateUrl: './scheduled-event-card.component.html',
  styleUrls: ['./scheduled-event-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduledEventCardComponent implements OnInit {
@Input () upcomingEvent:any
  constructor(private _coreSidebarService: CoreSidebarService,private router: Router, private event: EventService) { }

  ngOnInit(): void {
    console.log(this.upcomingEvent)
  }

  


  onStartClick(): void {
    
    this.event.setEventStarted(true);
    this.router.navigate(['/connection']);
  }
  AddEvent(event:string) {
    this._coreSidebarService.getSidebarRegistry(`${event}`).toggleOpen();
  }
}
