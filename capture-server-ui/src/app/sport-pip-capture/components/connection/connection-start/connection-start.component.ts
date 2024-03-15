import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { header } from './data'
@Component({
  selector: 'app-connection-start',
  templateUrl: './connection-start.component.html',
  styleUrls: ['./connection-start.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectionStartComponent implements OnInit {
  header: string[]
  constructor() { }
  connectiondetail: boolean = false
  ngOnInit(): void {
    this.header = header
  }
  ConnectionDetails(yes: boolean) {
    this.connectiondetail = yes
  }
  closeDetail(){
    this.connectiondetail = false
  }
}
