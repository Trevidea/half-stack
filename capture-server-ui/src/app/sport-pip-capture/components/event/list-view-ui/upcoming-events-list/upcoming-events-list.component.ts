import { Component, Input, OnInit } from '@angular/core';
import { DateTimeService } from '../../event-utility/date-time.service';

@Component({
  selector: 'app-upcoming-events-list',
  templateUrl: './upcoming-events-list.component.html',
  styleUrls: ['./upcoming-events-list.component.scss']
})
export class UpcomingEventsListComponent implements OnInit {
  @Input() datasource: any;
  constructor(private dateTimeService: DateTimeService) { }
  ngOnInit(): void {
  }

}
