import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { NGXLogger } from "ngx-logger";
import { AuthenticationService } from "app/auth/service";
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(
    private logger: NGXLogger,
    private _authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Log the request
    // this.logger.debug(request);

    // Continue with the request and capture the response
    return next.handle(request).pipe(
      tap((event) => {
        // Log the response
        if (event instanceof HttpResponse) {
          this.logger.info("Response received:", event);
          // Check if request method is POST, PUT, or DELETE
          console.log("request.method::::", request.method);
          if (
            request.method === "POST" ||
            request.method === "PUT" ||
            request.method === "DELETE"
          ) {
            // Create array of changes based on response body
            const changes = this.extractChangesFromResponseBody(event.body);
            // Log the array of changes
            this.logger.info("Changes:", changes);
          }
        }
      })
    );
  }

  private extractChangesFromResponseBody(body: any): any[] {
    console.log(body);
    const changes = [];
    if (body && body.GatewayResponse && body.GatewayResponse.result) {
      body.GatewayResponse.result.forEach((result: any) => {
        result.forEach((change: any) => {
          changes.push(change);
        });
      });
    }
    return changes;
  }
}
