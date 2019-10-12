import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  pwfForm: FormGroup;
  loading = false;
  public front = {
    logo: {
      src: './assets/img/brand/logo-viodiz-mini.png',
      alt: 'Logo',
    },
    bg: {
      src: '../assets/img/misc/bg-2.jpg',
      ill: '../assets/img/ill/ill-2.svg',
      google: '../assets/img/icons/common/google.svg',
    },
  };
  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.pwfForm = this.formBuilder.group({ email: ['', [Validators.email, Validators.required]] });
  }

  onPasswordForgot() {
    this.loading = true;
    return this.authService
      .passwordForgot(this.pwfForm.value['email'])
      .then(() => {
        alert('Votre compte a été mis à jour avec succès.');
        this.router.navigate(['auth', 'login']);
      })
      .catch(() => {})
      .then(() => (this.loading = false));
  }
}
