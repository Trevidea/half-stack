import { Component, OnInit } from '@angular/core';
import { header } from './data'
@Component({
  selector: 'app-devices-connecting',
  templateUrl: './devices-connecting.component.html',
  styleUrls: ['./devices-connecting.component.scss']
})
export class DevicesConnectingComponent implements OnInit {
  header: string[]
  constructor() { }

  ngOnInit(): void {
    this.header = header
  }

}
