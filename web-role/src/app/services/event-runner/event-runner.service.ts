import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventRunnerService {
  private isEventStarted = new BehaviorSubject<boolean>(false);
  private startedEventMetaData = new BehaviorSubject<any>(null);
  private startedEventId = new BehaviorSubject<number>(null);

  startedEventId$ = this.startedEventId.asObservable();
  isEventStarted$ = this.isEventStarted.asObservable();
  startedEventMetaData$ = this.startedEventMetaData.asObservable();

  constructor() { }

  setEventStarted(value: boolean) {
    this.isEventStarted.next(value);
  }

  setStartedEventMetaData(value: any) {
    // this.startedEventId.next(value)
    this.startedEventMetaData.next(value)
  }

  setstartedEventId(value: number) {
    // console.log(value)
    this.startedEventId.next(value)

  }
}