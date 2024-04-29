import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DateTimeService } from '../event-utility/date-time.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventPreviewComponent implements OnInit {
  @Input() datasource: any
  private countdownInterval: any;
  @Output() closePreview =  new EventEmitter()
  constructor(public dateTimeservice: DateTimeService, private modalService: NgbModal,
   
  ) { }

  ngOnInit(): void {

  }
  calculateUpcomingCountdown(item: any): string {
    const now = new Date();
    const eventDateTime = new Date(item?.dtEvent);
    eventDateTime.setHours(Math.floor(item.time / 100));
    eventDateTime.setMinutes(item.time % 100);
    const diff = eventDateTime.getTime() - now.getTime();

    if (diff >= 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const countdown = `Starts in ${this.padZero(days)} days, ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      return countdown;
    } else {
      return 'Event has ended';
    }
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  
}
