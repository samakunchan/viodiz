import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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

  ngOnInit() {}
}
