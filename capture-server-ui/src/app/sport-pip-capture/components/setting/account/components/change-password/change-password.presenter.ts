import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-change-password-presenter',
  template: `<app-change-password></app-change-password>`,
  styleUrls: ['./change-password.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ChangePasswordPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
