import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { PasswordComponent } from '../../pages/auth/password/password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'password',       component: PasswordComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
