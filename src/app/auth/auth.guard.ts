import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {UserService} from '../../@core/services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // tslint:disable-next-line:max-line-length
    if (this.userService.GetAccessToken() !== '' || this.userService.GetAccessToken() !== null || this.userService.GetAccessToken() !== undefined) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
