import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TimerService {
  private timer: any;
  private seconds: number = 0;
  private minutes: number = 0;
  private hours: number = 0;
  private running: boolean = false;
  private pausedTime: number = 0;
  private stopwatchSubject: BehaviorSubject<string>;

  constructor() {
    this.stopwatchSubject = new BehaviorSubject<string>(this.getTimeString());
  }

  private getTimeString(): string {
    return `${this.hours}:${this.minutes}:${this.seconds}`;
  }

  private updateStopwatch() {
    this.timer = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.minutes++;
        this.seconds = 0;
      }
      if (this.minutes === 60) {
        this.hours++;
        this.minutes = 0;
      }
      this.stopwatchSubject.next(this.getTimeString());
    }, 1000);
  }

  start() {
    if (!this.running) {
      this.running = true;
      if (this.pausedTime === 0) {
        this.updateStopwatch();
      } else {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - this.pausedTime;
        this.updateStopwatch();
        this.pausedTime = 0;
        this.advanceTime(elapsedTime);
      }
    }
  }

  stop() {
    clearInterval(this.timer);
    this.running = false;
    this.pausedTime = new Date().getTime();
  }

  reset() {
    clearInterval(this.timer);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.running = false;
    this.pausedTime = 0;
    this.stopwatchSubject.next(this.getTimeString());
  }

  private advanceTime(elapsedTime: number) {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    this.hours += hours;
    this.minutes += minutes;
    this.seconds += seconds;
    if (this.seconds >= 60) {
      this.minutes++;
      this.seconds -= 60;
    }
    if (this.minutes >= 60) {
      this.hours++;
      this.minutes -= 60;
    }
  }

  getStopwatch(): Observable<string> {
    return this.stopwatchSubject.asObservable();
  }
}
