import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { AuthUserUpdateAddInfos } from '../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss'],
})
export class FormProfileComponent implements OnInit {
  user: AuthUser;
  userProfilForm: FormGroup;
  @Input() authUser;
  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userProfilForm = this.formBuilder.group({
      username: ['', Validators.minLength(3)],
      firstname: ['', Validators.minLength(3)],
      lastname: ['', Validators.minLength(3)],
      addressLine: ['', Validators.minLength(3)],
      city: ['', Validators.minLength(3)],
      postCode: ['', Validators.minLength(3)],
      country: ['', Validators.minLength(3)],
      companyName: ['', Validators.minLength(3)], // ne pas oublier ça dans le html
      job: ['', Validators.minLength(3)],
      phone: ['', Validators.minLength(3)],
      website: ['', Validators.minLength(3)],
      linkedIn: ['', Validators.minLength(3)],
      facebook: ['', Validators.minLength(3)],
      twitter: ['', Validators.minLength(3)],
      instagram: ['', Validators.minLength(3)],
      aboutMe: [''],
    });
  }

  onSubmit() {
    this.user = new AuthUser();
    this.user.clear();
    this.user.displayName = this.userProfilForm.value['username'];
    this.user.firstname = this.userProfilForm.value['firstname'];
    this.user.lastname = this.userProfilForm.value['lastname'];
    this.user.address.addressLine = this.userProfilForm.value['addressLine'];
    this.user.address.city = this.userProfilForm.value['city'];
    this.user.address.postCode = this.userProfilForm.value['postCode'];
    this.user.address.country = this.userProfilForm.value['country'];
    this.user.companyName = this.userProfilForm.value['companyName'];
    this.user.job = this.userProfilForm.value['job'];
    this.user.phone = this.userProfilForm.value['phone'];
    this.user.website = this.userProfilForm.value['website'];
    this.user.socialsNetworks.linkedin = this.userProfilForm.value['linkedIn'];
    this.user.socialsNetworks.facebook = this.userProfilForm.value['facebook'];
    this.user.socialsNetworks.twitter = this.userProfilForm.value['twitter'];
    this.user.socialsNetworks.instagram = this.userProfilForm.value['instagram'];
    this.user.aboutMe = this.userProfilForm.value['aboutMe'];
    this.authService
      .buildingBeforeUpdate(this.user)
      .then((user: AuthUser) => {
        console.log(user);
        this.store.dispatch(new AuthUserUpdateAddInfos({ user }));
      })
      .catch(error => console.log(error));
  }
}
