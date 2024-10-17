import { Component, EventEmitter, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AddDeviceToEventComponent } from './add-device-to-event.component';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { MetaTypeBuilder } from 'src/app/blocks/meta-type-builder';
import { Transformer } from 'src/app/blocks/transformer';
import { ArrayBuilder } from 'src/app/blocks/array.builder';
import { Views } from 'src/app/services/models-interfaces/half-stack-interface';
import { TypesPresenter } from 'src/app/blocks/types/types.presenter';
import { AddDeviceView } from './view/add-device';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserProfileData } from 'src/app/services/models-interfaces/user-profile';
import { SelectItemView } from 'src/app/blocks/collection-item';
import { DeviceData } from 'src/app/services/models-interfaces/device';
import { DevicesBuilder } from './builder/device';
import { PresenterAction } from 'src/app/blocks/actions';
import { AddDeviceBuilder } from './builder/add-device';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-device-to-event-presenter',
  standalone: true,
  imports: [AddDeviceToEventComponent, MatSnackBarModule],
  template: `<app-add-device-to-event [datasource]="ds"  (save)="actions.onSave()"  (cancel)="doAction()"></app-add-device-to-event>`,
  styleUrl: './add-device-to-event.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddDeviceToEventPresenter implements OnInit {
  eventId: number;
  appName: string;
  _url: string;
  onClose: EventEmitter<any>;
  // private options: GlobalConfig;
  ds!: AddDeviceView;
  actions!: Views.FormActions;
  constructor(private modelService: ModelService,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: number },
    public dialogRef: MatDialogRef<AddDeviceToEventPresenter>,
    private router: Router,
    private snack: MatSnackBar) {
    this.ds = new AddDeviceView();
    this.ds.eventId = data.eventId;
    this.actions = new PresenterAction(
      null,
      this.ds,
      this.modelService.addDeviceToEvent,
      AddDeviceBuilder,
      router
    );
    this.actions.onComplete.subscribe((result) => {
      if (result) {

        this.doAction();
        this.snack.open("Device added", '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'left'
        });
      } else {
        console.error("Not Added device to event")
      }
    });
  }

  ngOnInit(): void {
    Transformer.ComposeCollectionViewAsync(this.modelService.usersJson(), this.ds.userName,
      (userItem: UserProfileData) => {
        return new SelectItemView(
          userItem.id,
          userItem.firstname + " " + userItem.lastname
        );
      }
    );

    Transformer.ComposeCollectionViewAsync(this.modelService.deviceList(), this.ds.deviceName,
      (deviceItem: DeviceData) => {
        return new SelectItemView(deviceItem.id, deviceItem.name);
      }
    );

    this.ds.deviceName.onItemSelected((e: { selectedItem: SelectItemView }) => {
      Transformer.ComposeObjectAsync(
        this.modelService.deviceById(e.selectedItem.key),
        this.ds,
        DevicesBuilder
      );
    });
    Transformer.ComposeObjectAsync(this.modelService.MetaTypeByKey("LOCATION"), this.ds.location, MetaTypeBuilder);
    Transformer.ComposeObject(this.modelService.type(), this.ds.type, ArrayBuilder);

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


    this.modelService.getApplications().subscribe((data) => {
      this.ds.appNamesCollection = data;
    });
  }

  doAction(): void {
    this.dialogRef.close();
  }


}
