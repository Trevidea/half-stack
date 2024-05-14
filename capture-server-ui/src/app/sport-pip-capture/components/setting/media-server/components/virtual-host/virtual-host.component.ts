import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VirtualHostFormComponent } from './virtual-host-form/virtual-host-form.component';

@Component({
  selector: 'app-virtual-host',
  templateUrl: './virtual-host.component.html',
  styleUrls: ['./virtual-host.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class VirtualHostComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  modalOpenMd() {
    this.modalService.open(VirtualHostFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
}
