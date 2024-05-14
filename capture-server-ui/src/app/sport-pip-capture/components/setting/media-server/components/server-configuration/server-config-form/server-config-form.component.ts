import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-server-config-form',
  templateUrl: './server-config-form.component.html',
  styleUrls: ['./server-config-form.component.scss']
})
export class ServerConfigFormComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
