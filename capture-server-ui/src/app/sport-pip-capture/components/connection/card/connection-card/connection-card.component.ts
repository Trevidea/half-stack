import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss']
})
export class ConnectionCardComponent implements OnInit {
   constructor() { }
  connectiondetail: boolean = false
  ngOnInit(): void {
   
  }
  ConnectionDetails(yes: boolean) {
    this.connectiondetail = yes
  }
  closeDetail(){
    this.connectiondetail = false
  }
}
