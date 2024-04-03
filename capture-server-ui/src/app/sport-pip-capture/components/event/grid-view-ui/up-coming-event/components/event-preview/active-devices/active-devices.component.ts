import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => { } },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
