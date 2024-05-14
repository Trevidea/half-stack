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

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log("request.method::::", event.body["Absolute URI"]);
          const changes = this.extractChangesFromResponseBody(event.body);
          console.log("B:::", changes);
        }
      })
    );
  }

  private extractChangesFromResponseBody(body: any): any {
    if (body && body["Gateway Response"] && body["Gateway Response"].result) {
      return body["Gateway Response"].result.map((arr: any) => {
        if (Array.isArray(arr)) {
          return arr.map((cppObj) => {
            const ngObj = this.cppToNg(cppObj);
            return ngObj;
          });
        } else {
          const ngObj = this.cppToNg(arr);
          return ngObj;
        }
      });
    }
    return null;
  }

  cppToNg(cppObj: any): { [key: string]: any } {
    let ngObj: { [key: string]: any } = {};
    if (Array.isArray(cppObj)) {
      for (const obj of cppObj) {
        if (obj && obj.field && obj.value !== undefined) {
          ngObj[obj.field] = obj.value;
        } else {
          console.warn("Invalid object structure in array:", obj);
        }
      }
    } else if (cppObj && cppObj.field && cppObj.value !== undefined) {
      ngObj[cppObj.field] = cppObj.value;
    } else {
      console.warn("Invalid object structure:", cppObj);
    }
    return ngObj;
  }
}

/*
demodulate(type: string, data: Observable<any>): Observable<any> {
    return data.pipe(map((blob) => blob["Gateway Response"].result)).pipe(
      map((arr: any[]) => {
        return arr.map((cppObj) => this.cppToNg(cppObj));
      })
    );
  }


  cppToNg(cppObj: { field: string; type: number; value: any }[]): {
    field: string;
    value: any;
  } {
    let ngObj: any = {};
    for (const obj of cppObj) {
      ngObj[obj.field] = obj.value;
    }
    return ngObj;
  }
*/
