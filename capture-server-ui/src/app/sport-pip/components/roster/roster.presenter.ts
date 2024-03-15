import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roster-presenter',
  template:`<app-roster></app-roster>`,
  styleUrls: ['./roster.component.scss']
})
export class RosterPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
