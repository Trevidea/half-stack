import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-end-notifictions',
  templateUrl: './event-end-notifictions.component.html',
  styleUrls: ['./event-end-notifictions.component.scss']
})
export class EventEndNotifictionsComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
