import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { ApplicationView } from './view/application';
import { ApplicationComponent } from "./application.component";

@Component({
  selector: 'app-application-presenter',
  standalone: true,
  template: `<app-application [datasource]='ds' (onAddApp)="fetchingapplications()"></app-application>`,
  styleUrls: ['./application.component.scss'],
  imports: [ApplicationComponent],
  encapsulation:ViewEncapsulation.None
})
export class ApplicationPresernter implements OnInit {
  ds: ApplicationView;

  constructor(private modalService: ModelService,) {
    this.ds = new ApplicationView()
  }

  ngOnInit(): void {
    this.fetchingapplications()
  }



  // modalOpenMd() {
  //   const modalRef = this.modalService.open(ApplicationFormComponent, {
  //     centered: true,
  //     size: "lg",
  //     backdrop: "static",
  //     keyboard: false,
  //   });
  //   modalRef.shown.subscribe(o => {
  //     const inst: ApplicationFormComponent = modalRef.componentInstance;
  //     inst.onAddNewApp.subscribe(res => {
  //       console.log(res)
  //       if (res) {
  //         this.fetchingapplications()
  //       }
  //     });
  //   })
  // }

  fetchingapplications() {
    this.modalService.getApplications().subscribe(
      response => {
        this.ds.applicationName = response
        console.log()
      },
      error => {
        console.error('Error fetching applications:', error);
      }
    );
  }

  onDelete(app: string) {
    this.modalService.deleteApp({ 'app-name': app }).subscribe(
      (data) => {
        console.log(data)
        this.fetchingapplications()
      }
    )
  }

}
