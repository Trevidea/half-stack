import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-presenter',
  template:`<app-media></app-media>`,
  styleUrls: ['./media.component.scss']
})
export class MediaPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
