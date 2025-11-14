import { Routes } from '@angular/router';
import { EmailJobComponent } from './components/email-job-component/email-job-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { AuthGuard } from './guards/auth-guard';
import { AccountInfoComponent } from './components/account-info-component/account-info-component';
import { AdminDashboardComponent } from './components/admin-dashboard-component/admin-dashboard-component';
import { ExceptionComponent } from './components/exception-component/exception-component';
import { AccountsComponent } from './components/accounts-component/accounts-component';



export const routes = [
  { path: 'emailjobs', component: EmailJobComponent, canActivate: [AuthGuard] },
  { path: 'profile-info', component: AccountInfoComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'exceptions', component: ExceptionComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent },
];
