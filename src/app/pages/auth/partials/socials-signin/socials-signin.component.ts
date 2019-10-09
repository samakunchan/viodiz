import { Component, OnInit } from '@angular/core';
import { Login } from '../../../../store/actions/auth.actions';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socials-signin',
  templateUrl: './socials-signin.component.html',
  styleUrls: ['./socials-signin.component.scss'],
})
export class SocialsSigninComponent implements OnInit {
  loadingGoogle = false;
  loadingFacebook = false;
  public front = {
    bg: {
      google: '../assets/img/icons/common/google.svg',
    },
  };
  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  onGoogleSignIn(event) {
    event.preventDefault();
    this.loadingGoogle = true;
    this.authService
      .signInWithGoogle()
      .then(user => {
        if (user) {
          this.store.dispatch(new Login({ authToken: user.idToken }));
          this.router.navigate(['admin', 'dashboard']);
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
          this.router.navigate(['admin', 'dashboard']);
        }
      })
      .catch(error => console.log(error));
  }
}
