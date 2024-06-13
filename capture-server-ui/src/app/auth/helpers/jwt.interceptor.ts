import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService) { }

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const currentUser = this._authenticationService.currentUserValue;
  //   const isLoggedIn = this._authenticationService.isLoggedIn();
  //   const isApiUrl = request.url.startsWith(environment.strapiServerUrl);
  //   if (isApiUrl) {
  //     const stdHeaders = new HttpHeaders();
  //     request = request.clone({
  //       headers: stdHeaders,
  //       body: request.body,
  //       context: request.context,
  //       method: request.method,
  //       params: request.params,

  //     });
  //   }
  //   return next.handle(request);
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValue;
    const isLoggedIn = this._authenticationService.isLoggedIn();
    const isApiUrl = request.url.startsWith(environment.strapiServerUrl);
    let headers = new HttpHeaders();

    if (isApiUrl) {
      if (request.body instanceof FormData) {
        // Set headers for file upload requests
        // headers = headers.set('');
      } else {
        // Set headers for JSON requests
        headers = headers.set('Content-Type', 'application/json');
      }

      request = request.clone({
        headers: headers,
        body: request.body,
        context: request.context,
        method: request.method,
        params: request.params,
      });
    }
    return next.handle(request);
  }
}