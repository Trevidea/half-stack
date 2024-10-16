import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { ModelService } from 'src/app/services/model-services/model-service.service';

@Component({
  selector: 'app-active-devices',
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule],
  templateUrl: './active-devices.component.html',
  styleUrl: './active-devices.component.scss'
})
export class ActiveDevicesComponent {
  @Input() eventId: any;
  @Input() datasource: any;
  @Output() onAddDeviceToevent = new EventEmitter();
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Block', icon: 'slash', action: () => { } },
    { label: 'Remove', icon: 'trash', action: () => { } },
  ]
  constructor(private router: Router, private modelService: ModelService) { }

  detail(item: any) {
    if (item.direction === 1) {
      console.log("sreaming device")
      this.router.navigate(['connections/streaming-device-details'], {
        queryParams: { devicedetail: JSON.stringify(item) }
      });
    }
  }


  deleteSelected(id: number) {
    this.modelService.delete('devices', id).subscribe((data) => {
      console.log(data)
    })
  }
}
