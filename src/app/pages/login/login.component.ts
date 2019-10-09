import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Login } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  loadingGoogle = false;
  loadingFacebook = false;
  public front = {
    logo: {
      src: './assets/img/brand/logo-viodiz-mini.png',
      alt: 'Logo',
    },
    bg: {
      src: '../assets/img/misc/bg-2.jpg',
      ill: '../assets/img/ill/ill-2.svg',
      google: '../assets/img/icons/common/google.svg'
    }
  };
  constructor(private authService: AuthService, private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  onGoogleSignIn(event) {
    event.preventDefault();
    this.loadingGoogle = true;
    this.authService.signInWithGoogle().then(user => {
      if (user) {
        this.store.dispatch(new Login({ authToken: user.idToken }));
        this.router.navigate(['admin', 'dashboard']); // Main page
      }
    });
  }

  ngOnDestroy() {}
}
