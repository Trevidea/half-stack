import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-presenter',
  template:`<app-notification></app-notification>`,
  styleUrls: ['./notification.component.scss']
})
export class NotificationPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
