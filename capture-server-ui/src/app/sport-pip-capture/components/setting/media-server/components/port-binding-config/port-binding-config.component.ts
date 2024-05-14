import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PortBindingFormComponent } from './port-binding-form/port-binding-form.component';

@Component({
  selector: 'app-port-binding-config',
  templateUrl: './port-binding-config.component.html',
  styleUrls: ['./port-binding-config.component.scss']
})
export class PortBindingConfigComponent implements OnInit {

  constructor(private ngbmodalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  modalOpenMd() {
    this.ngbmodalService.open(PortBindingFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
}
