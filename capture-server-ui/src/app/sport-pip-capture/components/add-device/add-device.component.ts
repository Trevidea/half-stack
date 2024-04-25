import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddDeviceComponent implements OnInit {
  deviceName
  streamingKey
  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
