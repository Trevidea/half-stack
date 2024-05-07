import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeviceFormComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
