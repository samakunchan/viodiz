import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store/effects/auth.effects';
import { PasswordComponent } from '../../pages/auth/password/password.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    TranslateModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginComponent, RegisterComponent, PasswordComponent],
})
export class AuthLayoutModule {}
