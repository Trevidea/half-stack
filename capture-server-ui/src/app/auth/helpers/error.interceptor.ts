import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthenticationService } from 'app/auth/service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("ErrorInterceptor: Intercepting HTTP request:", request);
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Log successful response
          console.log("ErrorInterceptor: HTTP request successful:", event.status);
        }
      }),
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this._router.navigate(['/pages/miscellaneous/not-authorized']);

          // ? Can also logout and reload if needed
          // this._authenticationService.logout();
          // location.reload(true);
        }
        // throwError
        // Log the error response
        console.error("ErrorInterceptor: HTTP error response:", err);
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
