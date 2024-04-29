import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDeviceComponent } from 'app/sport-pip-capture/components/add-device/add-device.component';
import { AddDevicePresenter } from 'app/sport-pip-capture/components/add-device/add-device.presenter';
import { UI } from 'app/sport-pip-capture/components/event/event-utility/event-ui-interface';

@Component({
  selector: 'app-active-devices',
  templateUrl: './active-devices.component.html',
  styleUrls: ['./active-devices.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActiveDevicesComponent implements OnInit {
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Block', icon: 'slash', type: 'feather', action: () => { } },
    { label: 'Remove', icon: 'trash', type: 'feather', action: () => { } },
  ]
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  openAddDeviceModal(){
    this.modalService.open(AddDevicePresenter, {
      centered: true,
      size: 'md'
    });
  }
}
