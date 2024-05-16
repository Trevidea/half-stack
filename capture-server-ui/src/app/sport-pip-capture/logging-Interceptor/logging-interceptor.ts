import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { AuthenticationService } from "app/auth/service";
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenticationService) {}

  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   return next.handle(request).pipe(
  //     tap((event) => {
  //       if (event instanceof HttpResponse) {
  //         console.log("request.method::::", event.body["Absolute URI"]);
  //         const changes = this.extractChangesFromResponseBody(event.body);
  //         console.log("B:::", changes);
  //       } else {
  //         console.log();
  //       }
  //     })
  //   );
  // }

  // private extractChangesFromResponseBody(body: any): any {
  //   if (body && body["Gateway Response"] && body["Gateway Response"].result) {
  //     return body["Gateway Response"].result.map((arr: any) => {
  //       if (Array.isArray(arr)) {
  //         return arr.map((cppObj) => {
  //           const ngObj = this.cppToNg(cppObj);
  //           return ngObj;
  //         });
  //       } else {
  //         const ngObj = this.cppToNg(arr);
  //         return ngObj;
  //       }
  //     });
  //   }
  //   return;
  // }

  // private cppToNg(cppObj: any): { [key: string]: any } {
  //   let ngObj: { [key: string]: any } = {};
  //   if (Array.isArray(cppObj)) {
  //     for (const obj of cppObj) {
  //       if (obj && obj.field && obj.value !== undefined) {
  //         ngObj[obj.field] = obj.value;
  //       } else {
  //         console.warn("Invalid object structure in array:", obj);
  //       }
  //     }
  //   } else if (cppObj && cppObj.field && cppObj.value !== undefined) {
  //     ngObj[cppObj.field] = cppObj.value;
  //   } else {
  //     console.warn("Invalid object structure:", cppObj);
  //   }
  //   return ngObj;
  // }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log("request.method::::", event.body["Absolute URI"]);
          console.log(event);
          // LogEvent.createEvent(event);
        }
      })
    );
  }
}

export class LogEvent {
  static createEvent(event: any) {
    if (event.body["Absolute URI"] == "/api/event" && event.method == "POST") {
      console.log(event);
    }
  }
  static deleteEvent() {}
  static updateEvent() {}
}
