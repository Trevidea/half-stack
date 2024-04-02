import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-past-event',
  templateUrl: './past-event.component.html',
  styleUrls: ['./past-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventComponent implements OnInit {
  @Input() datasource: any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  eventShareModalOpen(eventShareModal) {
    this.modalService.open(eventShareModal, {
      centered: true,
      size: 'lg'
    });
  }
  formatDateTime(dateTimeString: string, time: number): string {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    const timeHours = Math.floor(time / 100);
    const timeMinutes = time % 100;
    const amPm = timeHours >= 12 ? 'pm' : 'am';
    const formattedHours = timeHours % 12 || 12;
    const formattedMinutes = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    return `${formattedDate}, ${formattedHours}:${formattedMinutes} ${amPm}`;
  }
}
