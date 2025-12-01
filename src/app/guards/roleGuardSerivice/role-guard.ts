import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const user = this.authService.getLoggedInUser();

    if (!user) {
      this.router.navigate(['']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[];

    // Проверка дали има барем една дозволена улога
    if (allowedRoles.some(role => user.roles.includes(role))) {
      return true;
    }

    // Ако не — нема пристап
    this.router.navigate(['']);
    return false;
  }
}
