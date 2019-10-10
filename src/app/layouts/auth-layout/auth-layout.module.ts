import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordComponent } from '../../pages/auth/password/password.component';
import { SocialsSigninComponent } from '../../pages/auth/partials/socials-signin/socials-signin.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(AuthLayoutRoutes), FormsModule, TranslateModule],
  declarations: [LoginComponent, RegisterComponent, PasswordComponent, SocialsSigninComponent],
})
export class AuthLayoutModule {}
