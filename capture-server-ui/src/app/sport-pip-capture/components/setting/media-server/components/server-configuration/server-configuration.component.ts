import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerConfigFormComponent } from './server-config-form/server-config-form.component';

@Component({
  selector: 'app-server-configuration',
  templateUrl: './server-configuration.component.html',
  styleUrls: ['./server-configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServerConfigurationComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  modalOpenMd() {
    this.modalService.open(ServerConfigFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
}
