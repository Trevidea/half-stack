import { Component, Input } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-device-to-event',
  standalone: true,
  imports: [MaterialModule,],
  templateUrl: './add-device-to-event.component.html',
  styleUrl: './add-device-to-event.component.scss'
})
export class AddDeviceToEventComponent {
@Input() datasource:any
}
