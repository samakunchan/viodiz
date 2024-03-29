import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Login } from '../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  signInForm: FormGroup;
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
  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router, private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
      rememberMe: [false],
    });
  }

  onSignIn() {
    this.loading = true;
    this.authService
      .signIn(this.signInForm.value['email'], this.signInForm.value['password'])
      .then(user => {
        console.log(user);
        if (user) {
          this.store.dispatch(new Login({ authToken: user.idToken }));
          this.router.navigate(['admin', 'dashboard']);
          this.loading = false;
        }
      })
      .catch(() => {})
      .then(() => (this.loading = false));
  }
}
