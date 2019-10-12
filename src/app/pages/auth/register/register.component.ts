import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthUser } from '../../../core/models/auth.model';
import { Register } from '../../../store/actions/auth.actions';
import { AuthNoticeService } from '../../../core/auth-notice/auth-notice.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: AuthUser;
  loading = false;
  public front = {
    logo: {
      src: './assets/img/brand/logo-viodiz-mini.png',
      alt: 'Logo',
    },
    bg: {
      google: '../assets/img/icons/common/google.svg',
    },
  };
  count;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private formbuilder: FormBuilder,
    private authNoticeService: AuthNoticeService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)]],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        agree: ['', [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      },
    );
  }

  onRegister() {
    if (!this.registerForm.value['agree']) {
      this.authNoticeService.setNotice(this.translate.instant('AUTH.NOTIFICATIONS.REGISTER.AGREE'), 'warning');
      return;
    }
    this.loading = true;
    this.user = new AuthUser();
    this.user.clear();
    this.user.displayName = this.registerForm.value['username'];
    this.user.email = this.registerForm.value['email'];
    this.user.password = this.registerForm.value['password'];
    this.authService
      .register(this.user)
      .then(user => {
        if (user) {
          this.authNoticeService.setNotice(this.translate.instant('AUTH.NOTIFICATIONS.REGISTER.SUCCESS'), 'success');
          this.loading = false;
          this.store.dispatch(new Register({ authToken: user.idToken }));
          setTimeout(() => this.router.navigate(['auth', 'login']), 1000);
        }
      })
      .catch(error => console.log(error));
  }

  get control() {
    return this.registerForm.controls;
  }
}
