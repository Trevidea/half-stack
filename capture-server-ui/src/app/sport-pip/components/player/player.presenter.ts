import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-presenter',
  template:`<app-player></app-player>`,
  styleUrls: ['./player.component.scss']
})
export class PlayerPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}