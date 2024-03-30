import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
@Component({
  selector: 'app-up-coming-event',
  templateUrl: './up-coming-event.component.html',
  styleUrls: ['./up-coming-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpComingEventComponent implements OnInit {
  @Input() datasource: any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
    console.log(this.datasource)
  }


  AddEvent(event: string, item: any) {
    console.log(item)
    this._coreSidebarService.getSidebarRegistry(`${event}`).toggleOpen();
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
