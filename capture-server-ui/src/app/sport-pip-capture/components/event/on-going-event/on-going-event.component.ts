import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { slideInFromLeft, slideInFromTop, slideInFromRight, slideIn } from './animations';
@Component({
  selector: 'app-on-going-event',
  templateUrl: './on-going-event.component.html',
  styleUrls: ['./on-going-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideInFromLeft, slideInFromTop, slideInFromRight, slideIn,


  ],


  // animations: [
  //   trigger('fadeInOut', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('300ms', style({ opacity: 1 })),
  //     ]),
  //     transition(':leave', [
  //       animate('300ms', style({ opacity: 0 })),
  //     ]),
  //   ]),
  // ],

})
export class OnGoingEventComponent implements OnInit {
  @Input() datasource: any

  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.updateCountdownTimers();
    }, 1000);

  }
  getCurrentDateTime(): Date {
    return new Date();
  }

  updateCountdownTimers() {

    const currentDateTime = this.getCurrentDateTime();

    this.datasource.forEach((event, index) => {

      const eventDateTime = new Date(event.dttEvent + 'T' + event.time);
      const timeDifference = currentDateTime.getTime() - eventDateTime.getTime();

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
