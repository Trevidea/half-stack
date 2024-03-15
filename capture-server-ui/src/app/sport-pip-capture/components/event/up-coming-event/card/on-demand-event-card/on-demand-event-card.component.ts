import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { EventService } from '@core/services/event -start.service';

@Component({
  selector: 'app-on-demand-event-card',
  templateUrl: './on-demand-event-card.component.html',
  styleUrls: ['./on-demand-event-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OnDemandEventCardComponent implements OnInit {

  constructor(private _coreSidebarService: CoreSidebarService,private router: Router, private event: EventService) { }

  ngOnInit(): void {
  }
  AddEvent(event:string) {
    this._coreSidebarService.getSidebarRegistry(`${event}`).toggleOpen();
  }
  onStartClick(): void {
    
    this.event.setEventStarted(true);
    this.router.navigate(['/connection']);
  }
}
