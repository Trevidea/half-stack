import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-presenter',
  template:`<app-home></app-home>`,
  styleUrls: ['./home.component.scss']
})
export class HomePresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
