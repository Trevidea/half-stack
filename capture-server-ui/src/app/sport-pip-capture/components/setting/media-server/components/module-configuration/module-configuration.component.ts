import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleConfigFormComponent } from './module-config-form/module-config-form.component';

@Component({
  selector: 'app-module-configuration',
  templateUrl: './module-configuration.component.html',
  styleUrls: ['./module-configuration.component.scss']
})
export class ModuleConfigurationComponent implements OnInit {

  constructor(private ngbmodalService: NgbModal) { }

  ngOnInit(): void {
  }

  modalOpenMd() {
    this.ngbmodalService.open(ModuleConfigFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
}
