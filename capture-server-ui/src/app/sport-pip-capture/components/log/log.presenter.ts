import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-log-presenter',
  template:`<app-log></app-log>`,
  styleUrls: ['./log.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LogPresentert implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
