import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() eventId: any;
  @Input() datasource: any;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Block', icon: 'slash', type: 'feather', action: () => { } },
    { label: 'Remove', icon: 'trash', type: 'feather', action: () => { } },
  ]
  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {

  }

  openAddDeviceModal() {
    const modalRef = this.modalService.open(AddDevicePresenter, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.eventId = this.eventId;
  }

  onclickRow(data: any) {
    console.log(data)
    if (data.direction === 1) {
      console.log("sreaming device")
      this.router.navigate(['/connection-device-detail'], {
        queryParams: { devicedetail: JSON.stringify(data) }
      });
    }
  }
}
