import { Component, Input, OnInit } from '@angular/core';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';

@Component({
  selector: 'app-past-events-list',
  templateUrl: './past-events-list.component.html',
  styleUrls: ['./past-events-list.component.scss']
})
export class PastEventsListComponent implements OnInit {
  @Input() datasource: any;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Share Event', icon: 'share', type: 'feather', action: () => {} },
    { label: 'Upload to server', icon: 'upload-cloud', type: 'feather', action: () => {} },
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => {} },
  ]
  constructor(private dateTimeService: DateTimeService) { }
  
  ngOnInit(): void {
  }
}
