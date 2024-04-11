import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventPreviewComponent implements OnInit {
  @Input() datasource:any
  constructor() { }

  ngOnInit(): void {
    console.log(this.datasource)
  }

}
