import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-device-to-event',
  standalone: true,
  imports: [],
  templateUrl: './add-device-to-event.component.html',
  styleUrl: './add-device-to-event.component.scss'
})
export class AddDeviceToEventComponent {
@Input() datasource:any
}
