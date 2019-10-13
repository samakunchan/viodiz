import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState, currentUser } from '../../store';
import { Logout } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { AuthUser } from '../../core/models/auth.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user$: Observable<AuthUser>;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.user$ = this.store.select(currentUser);
  }

  getBg() {
    return 'bg-profil-bar';
  }

  onSignOut(event) {
    event.preventDefault();
    return this.authService
      .signOut()
      .then(() => {
        this.store.dispatch(new Logout());
      })
      .catch(error => console.log(error));
  }
}
