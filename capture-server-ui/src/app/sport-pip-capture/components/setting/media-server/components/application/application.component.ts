import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationFormComponent } from './application-form/application-form.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  modalOpenMd() {
    this.modalService.open(ApplicationFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
}
