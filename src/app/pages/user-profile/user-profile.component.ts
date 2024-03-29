import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, currentUser, CurrentUserUpdatePhoto } from '../../store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import * as toastr from '../../../assets/js/toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthUser, Products } from '../../core';
import { getProductPurchased } from '../../store/selectors/products.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user$: Observable<AuthUser>;
  public products: Observable<Products[]>;
  user: AuthUser;
  userAvatarForm: FormGroup;
  isEdit = false;
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.products = this.store.select(getProductPurchased);
    this.user$ = this.store.select(currentUser);
    this.initForm();
  }

  initForm() {
    this.userAvatarForm = this.formBuilder.group({
      avatar: ['', Validators.minLength(10)],
    });
  }

  onSendEmailVerification() {
    this.authService
      .sendMailVerification()
      .then(res => {
        if (res) {
          toastr.success(this.translate.instant('AUTH.NOTIFICATIONS.PASSWORD.SUCCESS'), 'Profil');
        }
      })
      .catch(() => toastr.success(this.translate.instant('AUTH.NOTIFICATIONS.PROFIL.SUCCESS'), 'Profil'));
  }
  detectFiles(event, email) {
    this.onUpload(event.target.files[0], email);
  }
  onUpload(file: File, email) {
    this.authService.uploadFile(file, 'profil', email).then((user: AuthUser) => {
      this.store.dispatch(new CurrentUserUpdatePhoto({ user }));
    });
  }

  onIsEdit() {
    if (this.isEdit) {
      return (this.isEdit = false);
    } else if (!this.isEdit) {
      return (this.isEdit = true);
    }
  }
}
