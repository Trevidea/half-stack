import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConfig, ToastrService } from 'ngx-toastr';
import { AddDeviceView } from './view/add-device';
import { TypesPresenter } from 'app/sport-pip-capture/blocks/types/types.presenter';
import { Views } from 'app/sport-pip-capture/models/capture-interface';
import { Transformer } from 'app/blocks/transformer';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { MetaTypeBuilder } from 'app/sport-pip-capture/blocks/meta-type.builder';

@Component({
  selector: 'app-add-device-presenter',
  template: `<app-add-device [datasource]='ds' ></app-add-device>`,
  styleUrls: ['./add-device.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDevicePresenter implements OnInit {
  private toastRef: any;
  private options: GlobalConfig;
  ds!: AddDeviceView
  actions!: Views.FormActions;
  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService, private modelServiceService: ModelServiceService) {
    this.ds = new AddDeviceView();
    this.options = this.toastr.toastrConfig;
  }

  ngOnInit(): void {
    
    Transformer.ComposeObjectAsync(this.modelServiceService.MetaTypeByKey("LOCATION"), this.ds.location, MetaTypeBuilder);
    this.ds.location.onAddingNewItem(async (e: { modal: Views.ModalHost }) => {
      e.modal.component = TypesPresenter;
      e.modal.properties["key"] = "LOCATION";
      try {
        const data = await e.modal.open();
        if (data) {
          Transformer.ComposeAndSelect(this.ds.location, data.newItem);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }



  toastrSuccess() {
    this.toastr.success('', 'Device Added!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

  onsave() {
    this.toastrSuccess()
    // this.activeModal.close('Accept click')
  }
}
