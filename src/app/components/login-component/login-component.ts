import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css'],
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
  standalone: true
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.logout().subscribe();
  }
  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/emailjobs']);
      },
      error: () => alert('Invalid credentials!')
    });
  }
}
