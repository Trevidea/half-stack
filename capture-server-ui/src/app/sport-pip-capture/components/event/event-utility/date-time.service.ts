import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventStartNotificationsComponent } from '../../event-notifications/event-start-notifications/event-start-notifications.component';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  popupShown: boolean = false;
  constructor(private modalService: NgbModal) { }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


  calculateUpcomingCountdown(data: any[]): void {
    const now = new Date();
    data.forEach(item => {
      const eventDateTime = new Date(item?._dtEvent);
      eventDateTime.setHours(Math.floor(item._time / 100));
      eventDateTime.setMinutes(item._time % 100);
      const diff = eventDateTime.getTime() - now.getTime();
      // console.log('Time Difference (ms):', diff);
      if (diff >= 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        item.countdown = `Starts in ${this.padZero(days)} days, ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        if (!this.popupShown && diff <= 1000) {
          this.modalOpenSM();
          this.popupShown = true;
        }
      } else {
        item.countdown = 'Started'
      }
    });
  }


  calculateUpcomingCountdownForSingle(item: any) {
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
      return `${this.padZero(days)} days, ${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    } else {
      return 'end';
    }
  }


  modalOpenSM() {
    this.modalService.open(EventStartNotificationsComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static', // Set the backdrop option here
      keyboard: false
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





  formatEventDate(dttEvent: string): string {
    const eventDate = new Date(dttEvent);
    // Extracting individual components of the date
    const month = eventDate.toLocaleString("en-US", { month: "short" });
    const day = eventDate.getDate();
    const weekday = eventDate.toLocaleString("en-US", { weekday: "long" });
    // Constructing the date string with appropriate suffix for day
    let dayString = day.toString();
    if (day > 10 && day < 20) {
      dayString += "th";
    } else {
      switch (day % 10) {
        case 1:
          dayString += "st";
          break;
        case 2:
          dayString += "nd";
          break;
        case 3:
          dayString += "rd";
          break;
        default:
          dayString += "th";
      }
    }

    // Concatenating all components to form the final date string
    return `${month} ${dayString}, ${weekday}`;
  }

  
  formatTime(timeNumber) {
    if (isNaN(timeNumber) || timeNumber === null || timeNumber === undefined, timeNumber === 0) {
      return "00:00";
    }
    const hours = Math.floor(timeNumber / 100);
    const minutes = timeNumber % 100;
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')}${period}`;
    return formattedTime;
  }






}
