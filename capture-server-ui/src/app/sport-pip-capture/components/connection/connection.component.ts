import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EventService } from '@core/services/event -start.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectionComponent implements OnInit {
  @Input() datasource:any
  eventStarted: boolean;
  header: string[]
   constructor(private router: Router, private event: EventService, ) {
    this.eventStarted = this.event.getEventStatus();

  }

  ngOnInit(): void {
    if (this.eventStarted === true) {

      setTimeout(() => {
        this.event.setEventStarted(false);
        Swal.fire({
          title: 'Event Ended',
          text: 'this event ended',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.eventStarted = false;
        this.router.navigate(["connection"]);

      }, 1 * 60 * 1000);
    } else {
      return
    }

  }




}
