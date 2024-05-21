import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationView } from './view/application';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  datasource: ApplicationView;

  constructor(private modalService: NgbModal, private modelServiceService: ModelServiceService) {
    this.datasource = new ApplicationView()
  }

  ngOnInit(): void {
    this.modelServiceService.getApplications().subscribe(
      response => {
        // this.applications = response.applications;
        console.log(response['Gateway Response']['applications'])
        this.datasource.applicationName = response['Gateway Response']['applications']
        console.log(this.datasource)
      },
      error => {
        console.error('Error fetching applications:', error);
      }
    );
  }

  delete() {
  }


  modalOpenMd() {
    const viewRef = this.modalService.open(ApplicationFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
}
