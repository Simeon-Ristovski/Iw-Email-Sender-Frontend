import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/authService/auth-service';
import { NgIf } from '@angular/common';
import { Account } from './models/Account';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, RouterModule, NgIf], 
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  loggedUser: Account | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.loggedUser = this.authService.getLoggedInUser();
      } else {
        this.loggedUser = null;
      }
    });

    this.loggedUser = this.authService.getLoggedInUser();
    this.isLoggedIn = !!this.loggedUser;
  }
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
