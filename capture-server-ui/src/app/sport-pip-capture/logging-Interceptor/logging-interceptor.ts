import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { AuthenticationService } from "app/auth/service";
import { HttpContextToken } from "@angular/common/http";

// Define a custom context token for storing original body

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenticationService) {}
  events = [];
  event = {};
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const uri = event.body["Absolute URI"];
          if (
            (request.method === "GET" && uri === "GET::/api/event") ||
            (request.method === "POST" && uri === "POST::/api/event") ||
            (request.method === "PUT" && uri === "PUT::/api/event")
          ) {
            // console.log("request.method::::", event);
            if (uri === "GET::/api/event") {
              event.body["Gateway Response"].result.forEach((element) => {
                this.events.push(element);
              });
            }
            if (uri === "PUT::/api/event") {
              // console.log("put::", event);
            }
          }
          // body["Absolute URI"]
          // const changes = this.extractChangesFromResponseBody(event.body);
          // console.log("B:::", changes);
          // console.log(this.events);
        } else {
          // console.log();
        }
      })
    );
  }
}
//   private extractChangesFromResponseBody(body: any): any {
//     if (body && body["Gateway Response"] && body["Gateway Response"].result) {
//       return body["Gateway Response"].result.map((arr: any) => {
//         if (Array.isArray(arr)) {
//           return arr.map((cppObj) => {
//             const ngObj = this.cppToNg(cppObj);
//             return ngObj;
//           });
//         } else {
//           const ngObj = this.cppToNg(arr);
//           return ngObj;
//         }
//       });
//     }
//     return;
//   }

//   private cppToNg(cppObj: any): { [key: string]: any } {
//     let ngObj: { [key: string]: any } = {};
//     if (Array.isArray(cppObj)) {
//       for (const obj of cppObj) {
//         if (obj && obj.field && obj.value !== undefined) {
//           ngObj[obj.field] = obj.value;
//         } else {
//           console.warn("Invalid object structure in array:", obj);
//         }
//       }
//     } else if (cppObj && cppObj.field && cppObj.value !== undefined) {
//       ngObj[cppObj.field] = cppObj.value;
//     } else {
//       console.warn("Invalid object structure:", cppObj);
//     }
//     return ngObj;
//   }

//   // intercept(
//   //   request: HttpRequest<any>,
//   //   next: HttpHandler
//   // ): Observable<HttpEvent<any>> {
//   //   return next.handle(request).pipe(
//   //     tap((event) => {
//   //       if (event instanceof HttpResponse) {
//   //         console.log("request.method::::", event.body["Absolute URI"]);
//   //         console.log(event);
//   //         // LogEvent.createEvent(event);
//   //       }
//   //     })
//   //   );
//   //  }
// }

// @Injectable()
// export class LoggingInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const started = Date.now();
//     // this.loggingService.log('Request started', { url: req.url, method: req.method, body: req.body });

//     return next.handle(req).pipe(
//       tap(
//         (event) => {
//           if (event instanceof HttpResponse) {
//             const elapsed = Date.now() - started;
//             // this.loggingService.log('Request completed', { url: req.url, method: req.method, body: req.body, response: event.body, duration: elapsed });
//           }
//         },
//         (error) => {
//           if (error instanceof HttpErrorResponse) {
//             const elapsed = Date.now() - started;
//             // this.loggingService.log('Request failed', { url: req.url, method: req.method, body: req.body, error: error.message, duration: elapsed });
//           }
//         }
//       )
//     );
//   }
// }
