import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { DeviceFormView } from './view/device-form';
import { Views } from 'src/app/services/models-interfaces/half-stack-interface';
import { Router } from '@angular/router';
import { PresenterAction } from 'src/app/blocks/actions';
import { DeviceFormBuilder } from './builder/device-form';
import { Transformer } from 'src/app/blocks/transformer';
import { MetaTypeBuilder } from 'src/app/blocks/meta-type-builder';
import { DeviceFormComponent } from './device-form.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-device-form-presenter',
  standalone: true,
  imports: [DeviceFormComponent],
  template: `<app-device-form [datasource]='ds' (save)="actions.onSave()"  (cancel)="doAction()"></app-device-form>`,
  styleUrl: './device-form.component.scss'
})
export class DeviceFormPresenter implements OnInit {
  ds!: DeviceFormView;
  actions!: Views.FormActions;

  constructor(private modelService: ModelService, private router: Router, public dialogRef: MatDialogRef<DeviceFormPresenter>) {
    this.ds = new DeviceFormView();
    this.actions = new PresenterAction(
      null,
      this.ds,
      this.modelService.saveDevice,
      DeviceFormBuilder,
      router
    );
    this.actions.onComplete.subscribe((result) => {
      if (result) {
        this.doAction();
      }
    });
  }

  ngOnInit(): void {
    Transformer.ComposeObjectAsync(
      this.modelService.MetaTypeByKey("DEVICETYPE"),
      this.ds.type,
      MetaTypeBuilder
    );
  }

  doAction(): void {
    this.dialogRef.close();
  }
}
