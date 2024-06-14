import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventUploadAuthView } from '../view/event-upload-auth';
import { Views } from 'app/sport-pip-capture/models/capture-interface';
import { PresenterAction } from 'app/blocks/actions';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { Route, Router } from '@angular/router';
import { EventUploadAuth } from '../builder/event-upload-auth';

@Component({
  selector: 'event-upload-auth-presenter',
  template: `<app-event-upload-authentication [datasource]="ds"  (save)="actions.onSave()"
    (cancel)="actions.onCancel()"></app-event-upload-authentication>`,
  styleUrls: ['./event-upload-authentication.component.scss']
})
export class EventUploadAuthenticationPresenter implements OnInit {
  ds!: EventUploadAuthView;
  actions!: Views.FormActions;
  constructor(private modelService: ModelServiceService, private router: Router) {
    this.ds = new EventUploadAuthView();
    this.actions = new PresenterAction(null, this.ds, this.modelService.eventUploadAuthentication,
      EventUploadAuth,
      router
    );
  }

  ngOnInit(): void {
  }

}
