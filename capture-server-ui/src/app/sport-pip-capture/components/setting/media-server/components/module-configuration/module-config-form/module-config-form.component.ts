import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-module-config-form',
  templateUrl: './module-config-form.component.html',
  styleUrls: ['./module-config-form.component.scss']
})
export class ModuleConfigFormComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
