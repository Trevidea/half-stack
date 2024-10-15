import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { DevicePresenter } from "./component/device/device.presenter";
import { MatDialog } from '@angular/material/dialog';
import { DeviceFormPresenter } from './component/device-form/device-form.presenter';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule, CommonModule, DevicePresenter],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


  
}
