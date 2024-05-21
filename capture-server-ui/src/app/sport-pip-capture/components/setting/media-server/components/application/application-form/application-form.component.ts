import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { ApplicationView } from '../view/application';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  datasource: ApplicationView;
  @Output() onAddNewApp = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private modelServiceService: ModelServiceService) {
    this.datasource = new ApplicationView()
  }
  ngOnInit(): void {

  }

  onSave() {
    console.log(this.datasource.appName)
    this.modelServiceService.createApp({ 'app-name': this.datasource.appName }).subscribe(
      (data) => {
        console.log(data);
        this.onAddNewApp.emit(true);
        this.activeModal.close('Save click')
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
