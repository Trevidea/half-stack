import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-presenter',
  template:`<app-shared></app-shared>`,
  styleUrls: ['./shared.component.scss']
})
export class SharedPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}