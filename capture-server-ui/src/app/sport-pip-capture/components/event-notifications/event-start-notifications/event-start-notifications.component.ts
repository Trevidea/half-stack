import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'event-start-notifications',
  templateUrl: './event-start-notifications.component.html',
  styleUrls: ['./event-start-notifications.component.scss'],
})
export class EventStartNotificationsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
