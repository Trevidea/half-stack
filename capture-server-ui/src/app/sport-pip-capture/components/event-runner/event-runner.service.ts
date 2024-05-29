import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventRunnerService {
  private isEventStarted = new BehaviorSubject<boolean>(false);
  isEventStarted$ = this.isEventStarted.asObservable();
  
  constructor() { }

  setEventStarted(value: boolean) {
    this.isEventStarted.next(value);
  }
}