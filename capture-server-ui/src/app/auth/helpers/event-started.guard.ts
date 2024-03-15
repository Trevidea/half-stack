import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { EventService } from "@core/services/event -start.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class EventStartedGuard implements CanActivate {

constructor( private event:EventService){

}
 canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const eventStarted = this.event.getEventStatus();

    // You can implement your logic here.
    // For example, allow access if event is started, otherwise, deny access.
    if (eventStarted) {
      return true; // Access is allowed
    } else {
      // Redirect to another route or show an error message
      return false; // Access is denied
    }
  }
   
    
  }