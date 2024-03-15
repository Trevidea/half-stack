import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sport-pip-presenter',
  template:`<app-sport-pip></app-sport-pip>`,
  styleUrls: ['./sport-pip.component.scss']
})
export class SportPipPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
