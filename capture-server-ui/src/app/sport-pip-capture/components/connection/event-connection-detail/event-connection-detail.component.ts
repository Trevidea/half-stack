import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-event-connection-detail',
  templateUrl: './event-connection-detail.component.html',
  styleUrls: ['./event-connection-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventConnectionDetailComponent implements OnInit {
  @Output() closeDetail = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  ConnectiondetailClose() {
    this.closeDetail.emit(false);
  }
}
