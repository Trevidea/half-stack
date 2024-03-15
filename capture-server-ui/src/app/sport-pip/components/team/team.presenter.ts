import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-presenter',
  template:`<app-team></app-team>`,
  styleUrls: ['./team.component.scss']
})
export class TeamPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
