import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
@Component({
  selector: 'app-up-coming-event',
  templateUrl: './up-coming-event.component.html',
  styleUrls: ['./up-coming-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpComingEventComponent implements OnInit {
  @Input ()datasource:any
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  targetDate: Date;
  countdown: string;
  constructor( private _coreSidebarService: CoreSidebarService) { }

  ngOnInit(): void {

    // this.datasource.upcomingEvent.forEach((event, index) => {
    //   const [year,month,day] = event.dttEvent.split('-').map(Number);
    //   const [hours, minutes] = event.time.split(':').map(Number);
    //   const targetDate = new Date(year, month - 1, day, hours, minutes);

    //   this.startCountdown(targetDate, index);
    // });
    // setInterval(() => {
    //   this.datasource.upcomingEvent.forEach((event, index) => {
    //     const [year,month,day] = event.dttEvent.split('-').map(Number);
    //     const [hours, minutes] = event.time.split(':').map(Number);
    //     const targetDate = new Date(year, month - 1, day, hours, minutes);

    //     this.updateCountdown(targetDate, index);
    //   });
    // }, 1000);
  }
  countdowns: string[] = [];
  startCountdown(targetDate: Date, index: number) {
    this.updateCountdown(targetDate, index);
  }

  updateCountdown(targetDate: Date, index: number) {
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();
  

    if (timeDifference <= 0) {
      this.datasource.upcomingEvent[index].countdown = "Countdown expired";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      this.datasource.upcomingEvent[index].countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }
  AddEvent(event:string,item:any) {
    console.log(item)
    this._coreSidebarService.getSidebarRegistry(`${event}`).toggleOpen();
  }
}
