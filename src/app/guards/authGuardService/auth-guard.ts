import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const loggedInUser = this.authService.getLoggedInUser();

    if (loggedInUser) {
      return true; // ако е најавен, може да пристапи
    } else {
      this.router.navigate(['/']); // ако не е, редиректирај на login
      return false;
    }
  }
}
