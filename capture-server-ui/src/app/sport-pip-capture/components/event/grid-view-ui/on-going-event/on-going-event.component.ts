import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
@Component({
  selector: 'app-on-going-event',
  templateUrl: './on-going-event.component.html',
  styleUrls: ['./on-going-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OnGoingEventComponent implements OnInit {
  @Input() datasource: any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;

  constructor(private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.updateCountdownTimers();
    }, 1000);

  }
  getCurrentDateTime(): Date {
    return new Date();
  }
  eventDetail(event: string) {
    this._coreSidebarService.getSidebarRegistry(event).toggleOpen();
  }
  updateCountdownTimers() {
    const currentDateTime = this.getCurrentDateTime();
    this.datasource.forEach((event, index) => {
      const eventDateTime = new Date(event.dttEvent +'T'+'10:00:00');
      const timeDifference = eventDateTime.getTime() - currentDateTime.getTime();
      if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        event.countdown = `${hours}h ${minutes}m ${seconds}s`
      } else {

        event.countdown = null;
      }
    });

  }

}
