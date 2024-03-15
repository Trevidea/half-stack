import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-presenter',
  template:`<app-setting></app-setting>`,
  styleUrls: ['./setting.component.scss']
})
export class SettingPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
