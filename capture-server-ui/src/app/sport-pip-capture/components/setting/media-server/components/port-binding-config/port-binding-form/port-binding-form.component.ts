import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-port-binding-form',
  templateUrl: './port-binding-form.component.html',
  styleUrls: ['./port-binding-form.component.scss']
})
export class PortBindingFormComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
