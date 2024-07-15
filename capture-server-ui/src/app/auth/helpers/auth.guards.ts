import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthenticationService } from 'app/auth/service';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard extends KeycloakAuthGuard {
  
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService,
    protected readonly keycloak: KeycloakService
  ) {
    super(_router, keycloak);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    return this.authenticated;
  }



  // canActivate
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const currentUser = this._authenticationService.currentUserValue;

  //   if (currentUser) {
  //     // check if route is restricted by role
  //     if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
  //       // role not authorised so redirect to not-authorized page
  //       this._router.navigate(['/pages/miscellaneous/not-authorized']);
  //       return false;
  //     }

  //     // authorised so return true
  //     return true;
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this._router.navigate(['/pages/authentication/login-v2'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }
}
