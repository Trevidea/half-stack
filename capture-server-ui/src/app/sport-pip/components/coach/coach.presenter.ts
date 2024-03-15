import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach-presenter',
  template:`<app-coach></app-coach>`,
  styleUrls: ['./coach.component.scss']
})
export class CoachPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
