import { Routes } from '@angular/router';
import { EmailJobComponent } from './components/email-job-component/email-job-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { AuthGuard } from './guards/auth-guard';



export const routes = [
  { path: 'emailjobs', component: EmailJobComponent,canActivate: [AuthGuard]  },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
