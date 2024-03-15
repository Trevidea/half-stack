import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class EventService{
    private eventStarted: boolean = false;

    setEventStarted(status: boolean): void {
        console.log('yes')
      this.eventStarted = status;
    }
  
    getEventStatus(): boolean {
      return this.eventStarted;
    }
}