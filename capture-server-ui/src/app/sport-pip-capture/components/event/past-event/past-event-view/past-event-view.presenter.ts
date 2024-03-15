import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-past-event-view-presenter',
  template:`<app-past-event-view></app-past-event-view>`,
  styleUrls: ['./past-event-view.component.scss']
})
export class PastEventViewPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}