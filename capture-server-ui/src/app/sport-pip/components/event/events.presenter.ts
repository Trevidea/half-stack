import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-presenter',
  template:`<app-events></app-events>`,
  styleUrls: ['./events.component.scss']
})
export class EventsPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
