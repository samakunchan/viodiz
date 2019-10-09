import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Router } from '@angular/router';
import { Login } from '../../../store/actions/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit{
  loadingGoogle = false;
  loadingFacebook = false;
  pwfForm: FormGroup;
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
    this.pwfForm = this.formBuilder.group({email: ['', [Validators.email, Validators.required]]});
  }

  onGoogleSignIn(event) {
    event.preventDefault();
    this.loadingGoogle = true;
    this.authService
      .signInWithGoogle()
      .then(user => {
        if (user) {
          this.store.dispatch(new Login({ authToken: user.idToken }));
          this.router.navigate(['admin', 'dashboard']); // Main page
        }
      })
      .catch(error => console.log(error));
  }

  onFacebookSignIn(event) {
    event.preventDefault();
    this.loadingFacebook = true;
    this.authService
      .signInWithFacebook()
      .then(user => {
        if (user) {
          this.store.dispatch(new Login({ authToken: user.idToken }));
          this.router.navigate(['admin', 'dashboard']); // Main page
        }
      })
      .catch(error => console.log(error));
  }

  onPasswordForgot() {
    return this.authService.passwordForgot(this.pwfForm.value['email'])
      .then(res => {
      alert('Votre compte a été mis à jour avec succès.');
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode === 'auth/user-not-found') {
        alert(errorMessage);
      }
    });
  }

}
