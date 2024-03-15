import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capture-dashboard-presenter',
  template:`<app-capture-dashboard></app-capture-dashboard>`,
  styleUrls: ['./dashboard.component.scss']
})
export class CaptureDashboardPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
