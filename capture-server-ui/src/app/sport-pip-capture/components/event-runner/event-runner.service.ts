import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventRunnerService {
  private isEventStarted = new BehaviorSubject<boolean>(false);
  private startedEventMetaData = new BehaviorSubject<any>(null);

  isEventStarted$ = this.isEventStarted.asObservable();
  startedEventMetaData$ = this.startedEventMetaData.asObservable();

  constructor() { }

  setEventStarted(value: boolean) {
    this.isEventStarted.next(value);
  }

  setStartedEventMetaData(value: any) {
    console.log(value)
    this.startedEventMetaData.next(value)
  }

}