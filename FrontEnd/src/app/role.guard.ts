import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authservice.HaveAccess()) {
      return false;
    } else {
      alert('You are not authorized!!!');
      this.router.navigate(['/login']);
      return true;
    }
  }
}
