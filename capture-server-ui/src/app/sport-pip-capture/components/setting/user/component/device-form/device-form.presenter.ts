import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DeviceFormView } from './view/device-form';
import { Views } from 'app/sport-pip-capture/models/capture-interface';
import { Transformer } from 'app/blocks/transformer';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { MetaTypeBuilder } from 'app/sport-pip-capture/blocks/meta-type.builder';
import { TypesPresenter } from 'app/sport-pip-capture/blocks/types/types.presenter';
import { PresenterAction } from 'app/blocks/actions';
import { DeviceBuilder } from '../device/builder/device';
import { DeviceFormBuilder } from './builder/device-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-form-presenter',
  template: `<app-device-form [datasource]='ds' (save)="actions.onSave()"></app-device-form>`,
  styleUrls: ['./device-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeviceFormPresenter implements OnInit {
  ds!: DeviceFormView;
  actions!: Views.FormActions;
  @Output() onUpdate = new EventEmitter<any>();
  constructor(private modelService: ModelServiceService, private router: Router) {
    this.ds = new DeviceFormView();
    this.actions = new PresenterAction(null, this.ds, this.modelService.saveDevice, DeviceFormBuilder, router);
    this.actions.onComplete.subscribe((result) => {
      if (result) {
        this.onUpdate.emit(result);
      }
    });
  }


  ngOnInit(): void {
    Transformer.ComposeObjectAsync(this.modelService.MetaTypeByKey("DEVICETYPE"), this.ds.type, MetaTypeBuilder);
    this.ds.type.onAddingNewItem(async (e: { modal: Views.ModalHost }) => {
      e.modal.component = TypesPresenter;
      e.modal.properties["key"] = "DEVICETYPE";
      try {
        const data = await e.modal.open();
        if (data) {
          Transformer.ComposeAndSelect(this.ds.type, data.newItem);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  onclose() {

  }

}
