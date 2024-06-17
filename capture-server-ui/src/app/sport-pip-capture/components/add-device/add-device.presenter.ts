import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { GlobalConfig, ToastrService } from "ngx-toastr";
import { AddDeviceView } from "./view/add-device";
import { TypesPresenter } from "app/sport-pip-capture/blocks/types/types.presenter";
import { Views } from "app/sport-pip-capture/models/capture-interface";
import { Transformer } from "app/blocks/transformer";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
import { MetaTypeBuilder } from "app/sport-pip-capture/blocks/meta-type.builder";
import { ModalActions, PresenterAction } from "app/blocks/actions";
import { AddDeviceBuilder } from "./builder/add-device";
import { Router } from "@angular/router";
import { UserProfileData } from "app/sport-pip-capture/models/user-profile";
import { SelectItemView } from "app/blocks/collection-item";
import { DeviceData } from "app/sport-pip-capture/models/device";
import { DevicesBuilder } from "./builder/device";
import { ArrayBuilder } from "app/sport-pip-capture/blocks/array.builder";

@Component({
  selector: "app-add-device-presenter",
  template: `<app-add-device
    [datasource]="ds"
    (save)="actions.onSave()"
    (cancel)="actions.onCancel()"
  ></app-add-device>`,
  styleUrls: ["./add-device.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddDevicePresenter implements OnInit {
  @Input() eventId: number;
  appName: string;
  _url: string;
  onClose: EventEmitter<any>;
  private options: GlobalConfig;
  ds!: AddDeviceView;
  actions!: Views.FormActions;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private modelServiceService: ModelServiceService,
    private router: Router
  ) {
    this.ds = new AddDeviceView();
    this.options = this.toastr.toastrConfig;
    this.actions = new PresenterAction(
      null,
      this.ds,
      this.modelServiceService.saveEventDevice,
      AddDeviceBuilder,
      router
    );
    this.actions.onComplete.subscribe((result) => {
      if (result) {
        this.toastrSuccess();
      } else {
        this.toastrError();
      }
    });

    Transformer.ComposeCollectionViewAsync(
      this.modelServiceService.usersJson(),
      this.ds.userName,
      (userItem: UserProfileData) => {
        return new SelectItemView(
          userItem.id,
          userItem.firstname + " " + userItem.lastname
        );
      }
    );

    Transformer.ComposeCollectionViewAsync(
      this.modelServiceService.deviceList(),
      this.ds.deviceName,
      (deviceItem: DeviceData) => {
        return new SelectItemView(deviceItem.id, deviceItem.name);
      }
    );

    this.ds.deviceName.onItemSelected((e: { selectedItem: SelectItemView }) => {
      Transformer.ComposeObjectAsync(
        this.modelServiceService.deviceById(e.selectedItem.key),
        this.ds,
        DevicesBuilder
      );
    });
  }

  ngOnInit(): void {
    this.ds.eventId = this.eventId;

    Transformer.ComposeObjectAsync(
      this.modelServiceService.MetaTypeByKey("LOCATION"),
      this.ds.location,
      MetaTypeBuilder
    );
    Transformer.ComposeObject(
      this.modelServiceService.type(),
      this.ds.type,
      ArrayBuilder
    );
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

    // this.modelServiceService.fetechApplicationDetail().subscribe((data) => {
    //   const appValue = data["Gateway Response"]["result"][0][0]["app"];
    //   this.ds.appName = appValue;
    // });

    this.modelServiceService.getApplications().subscribe((data) => {
      this.ds.appNamesCollection = data;
    });

  }

  toastrSuccess() {
    this.activeModal.close("Accept click");
    this.toastr.success("", "Device Added!", {
      toastClass: "toast ngx-toastr",
      closeButton: true,
    });
  }

  toastrError() {
    this.toastr.error("", "Device Not Added !", {
      toastClass: "toast ngx-toastr",
      closeButton: true,
    });
  }
  onsave(onClose: EventEmitter<any>) {
    this.toastrSuccess();
  }
}
