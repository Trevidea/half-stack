import { Component, OnInit } from '@angular/core';
import { AddDeviceToEventComponent } from './add-device-to-event.component';
import { ModelService } from 'src/app/services/model-services/model-service.service';

@Component({
  selector: 'app-add-device-to-event-presenter',
  standalone: true,
  imports: [AddDeviceToEventComponent],
  template: `<app-add-device-to-event [datasource]="ds" ></app-add-device-to-event>`,
  styleUrl: './add-device-to-event.component.scss'
})
export class AddDeviceToEventPresenter implements OnInit {

  ds!: any

  constructor(private modelService: ModelService) {

  }
  ngOnInit(): void {

  }

}
