import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, timer, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TimerService {
  private timer$: Observable<number>;
  private totalSeconds = 0;
  private timerSubject = new BehaviorSubject<string>("00:00:00");
  private timerSubscription: Subscription;

  constructor() {
    this.timer$ = timer(0, 1000);
    this.timerSubscription = this.timer$
      .pipe(map(() => this.totalSeconds++))
      .subscribe(() => {
        this.timerSubject.next(this.formatTime());
      });
  }

  private formatTime(): string {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = this.totalSeconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  getTime(): Observable<string> {
    return this.timerSubject.asObservable();
  }

  startTimer(startFrom?: number) {
    if (startFrom !== undefined) {
      this.totalSeconds = startFrom;
    }
    this.timerSubscription = this.timer$
      .pipe(map(() => this.totalSeconds++))
      .subscribe(() => {
        this.timerSubject.next(this.formatTime());
      });
  }

  pauseTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.totalSeconds = 0;
    this.timerSubject.next("00:00:00");
  }
}
