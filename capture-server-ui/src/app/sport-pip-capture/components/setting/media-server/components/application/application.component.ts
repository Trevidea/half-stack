import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationView } from './view/application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  datasource: ApplicationView;

  constructor(private modalService: NgbModal) {
    this.datasource = new ApplicationView()
  }

  ngOnInit(): void {
  }

  delete() {
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
