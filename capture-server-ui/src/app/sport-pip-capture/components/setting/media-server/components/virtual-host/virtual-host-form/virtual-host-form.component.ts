import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-virtual-host-form',
  templateUrl: './virtual-host-form.component.html',
  styleUrls: ['./virtual-host-form.component.scss']
})
export class VirtualHostFormComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
