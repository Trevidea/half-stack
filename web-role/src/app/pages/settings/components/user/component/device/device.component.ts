import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { DeviceFormPresenter } from '../device-form/device-form.presenter';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})
export class DeviceComponent {
  @Input() datasource: any;
  @Output() onAddDevice = new EventEmitter()
  @Output() onDelete = new EventEmitter()

  constructor(private dialog: MatDialog) {

  }

  addDevice() {
    const dialogRef = this.dialog.open(DeviceFormPresenter, {
      maxWidth: '700px',
      width: '100%',

    });
    dialogRef.afterClosed().subscribe(result => {
      this.onAddDevice.emit();
    });
  }
}
