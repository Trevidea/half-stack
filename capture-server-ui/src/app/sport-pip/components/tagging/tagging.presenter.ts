import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tagging-presenter',
  template:`<app-tagging></app-tagging>`,
  styleUrls: ['./tagging.component.scss']
})
export class TaggingPresenter implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}