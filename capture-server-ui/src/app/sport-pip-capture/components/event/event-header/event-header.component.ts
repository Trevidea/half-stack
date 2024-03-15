import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHeaderComponent implements OnInit {
  @Input () datasource:any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
