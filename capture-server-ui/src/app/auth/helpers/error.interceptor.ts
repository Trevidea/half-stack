import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { AuthenticationService } from "app/auth/service";
import { ErrorModalService } from "app/sport-pip-capture/blocks/error-model-service/error-modal.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private modalService: ErrorModalService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // successful response with error property
          if (event.body["Gateway Response"]?.error) {
            console.log( event.body)
            const massage = event.body["Gateway Response"]?.error;
            this.modalService.openErrorModal(massage);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if ([401, 403].indexOf(error.status) !== -1) {
          this._router.navigate(["/pages/miscellaneous/not-authorized"]);
        }

        if (error.status === 0) {
          // Handle network error
          this.modalService.openErrorModal(
            "Attention: Backend service currently unavailable. We are actively addressing the issue"
          );
        } else if (error.error instanceof ErrorEvent) {
          // Handling  client-side error
          // this.modalService.openErrorModal(
          //   "An error occurred on the client side. Please try again later."
          // );
        } else {
          // Handlindling server-side error
          let errorMessage = "An error occurred while processing your request.";
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.modalService.openErrorModal(errorMessage);
        }
        return throwError(error);
      })
      // catchError(err => {
      //   console.log(err)
      //   if ([401, 403].indexOf(err.status) !== -1) {
      //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //     this._router.navigate(['/pages/miscellaneous/not-authorized']);
      //     // ? Can also logout and reload if needed
      //     // this._authenticationService.logout();
      //     // location.reload(true);
      //   }
      //   // throwError
      //   // Log the error response
      //   console.error("ErrorInterceptor: HTTP error response:", err.statusText);
      //   const error = err.error.message || err.statusText;
      //   return throwError(error);
      // })
    );
  }
}
