import { Component, Input, OnInit } from '@angular/core';
import { DateTimeService } from '../../event-utility/date-time.service';

@Component({
  selector: 'app-past-events-list',
  templateUrl: './past-events-list.component.html',
  styleUrls: ['./past-events-list.component.scss']
})
export class PastEventsListComponent implements OnInit {
  @Input() datasource: any;
  
  constructor(private dateTimeService: DateTimeService) { }
  
  ngOnInit(): void {
  }
}
