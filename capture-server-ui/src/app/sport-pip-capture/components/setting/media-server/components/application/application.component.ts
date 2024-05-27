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
    this.fetchingapplications()
  }

  onDelete(app: string) {
   
    this.modelServiceService.deleteApp({'app-name': app}).subscribe(
      (data) => {
        console.log(data)
        this.fetchingapplications()
      }
    )
  }


  modalOpenMd() {
    const modalRef = this.modalService.open(ApplicationFormComponent, {
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.shown.subscribe(o => {
      const inst: ApplicationFormComponent = modalRef.componentInstance;
      inst.onAddNewApp.subscribe(res => {
        console.log(res)
        if (res) {
          this.fetchingapplications()
        }
      });
    })
  }

  fetchingapplications() {
    this.modelServiceService.getApplications().subscribe(
      response => {
        this.datasource.applicationName = response
        console.log()
      },
      error => {
        console.error('Error fetching applications:', error);
      }
    );
  }
}
