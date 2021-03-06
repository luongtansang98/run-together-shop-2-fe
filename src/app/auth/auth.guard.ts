import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: UserService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('token') != null) {
        const roles = next.data.expectedRoles as Array<string>;
        if (roles) {
          if (this.service.roleMath(roles)) {
            return true;
          } else {
              this.router.navigate(['admin/login']);
              return false;
            }
        } else {
          this.router.navigate(['admin/login']);
          return false;
        }
      } else {
        this.router.navigate(['admin/login']);
        return false;
      }
  }
}
