import { Injectable, inject } from "@angular/core";
import { Observable, interval } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class Timer {
  private startTime: number;
  private pausedTime: number = 0;
  private isRunning: boolean = false;

  start(): void {
    if (!this.isRunning) {
      this.startTime = Date.now();
      this.isRunning = true;
    }
  }

  stop(): void {
    if (this.isRunning) {
      this.pausedTime = 0;
      this.isRunning = false;
    }
  }

  pause(): void {
    if (this.isRunning) {
      this.pausedTime += Date.now() - this.startTime;
      this.isRunning = false;
    }
  }

  resume(): void {
    if (!this.isRunning) {
      this.startTime = Date.now();
      this.isRunning = true;
    }
  }

  getElapsedTime(): Observable<string> {
    return interval(1000).pipe(
      map(() => {
        const elapsed = this.isRunning
          ? Date.now() - this.startTime + this.pausedTime
          : this.pausedTime;

        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        return `${this.formatTime(hours)}:${this.formatTime(
          minutes
        )}:${this.formatTime(seconds)}`;
      })
    );
  }

  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
