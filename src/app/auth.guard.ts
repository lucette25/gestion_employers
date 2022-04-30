import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './api/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: UserService,private router: Router) {}
  canActivate() {
      if (sessionStorage.getItem('login') === 'true') {
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}
