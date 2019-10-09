import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthUser } from '../../../core/models/auth.model';
import { Register } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  user: AuthUser;
  public front = {
    logo: {
      src: './assets/img/brand/logo-viodiz-mini.png',
      alt: 'Logo',
    },
    bg: {
      google: '../assets/img/icons/common/google.svg',
    },
  };
  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      agree: ['', [Validators.required]],
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  onRegister() {
    if (!this.registerForm.value['agree']) {
      alert('Coche la case');
      return;
    }
    this.loading = true;
    this.user = new AuthUser();
    this.user.clear();
    this.user.displayName = this.registerForm.value['username'];
    this.user.email = this.registerForm.value['email'];
    this.user.password = this.registerForm.value['password'];
    this.authService.register(this.user).then(user => {
      if (user) {
        this.store.dispatch(new Register({ authToken: user.idToken }));
        // pass notice message to the login page
        alert('Votre compte a été créé.');
        this.router.navigate(['auth', 'login']);
        this.loading = false;
      } else {
        alert('Un problème est survenu lors de la création de votre compte.');
      }
    }).catch(error => console.log(error));
  }
}
