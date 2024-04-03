import { Component, Input, OnInit } from '@angular/core';
import { DateTimeService } from '../../event-utility/date-time.service';
import { UI } from '../../event-utility/event-ui-interface';

@Component({
  selector: 'app-upcoming-events-list',
  templateUrl: './upcoming-events-list.component.html',
  styleUrls: ['./upcoming-events-list.component.scss']
})
export class UpcomingEventsListComponent implements OnInit {
  @Input() datasource: any;
  dropdownItems: UI.DropDownMenuItem[] = [
    { label: 'Remove Event', icon: 'trash', type: 'feather', action: () => { } },
  ]
  constructor(private dateTimeService: DateTimeService) { }
  ngOnInit(): void {
  }

}
