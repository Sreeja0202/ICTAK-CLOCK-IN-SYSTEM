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
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (!this.authservice.IsloggedIn()) {
      alert('You are not Logged In');
      this.router.navigate(['/login']);
      return false;
    }

    return this.authservice.IsloggedIn();
  }
}
