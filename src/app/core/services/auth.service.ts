import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthUser } from '../models/auth.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: AuthUser;
  constructor(private afauth: AngularFireAuth, private afstorage: AngularFireStorage, private db: AngularFirestore, private router: Router) {
    this.user = new AuthUser();
    this.user.clear();
  }

  getUserByTokenFromCloud(): Observable<AuthUser> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    return new Observable(observer => {
      const tokenFromCloud = firebase.functions().httpsCallable('getUserWithToken');
      tokenFromCloud({ token: userToken })
        .then(result => {
          return observer.next(result.data);
        })
        .catch(error => observer.error(error));
    });
  }

  async signInWithGoogle() {
    if (!this.afauth.auth.currentUser) {
      const provider = new firebase.auth.GoogleAuthProvider();

      return await this.afauth.auth
        .signInWithPopup(provider)
        .then(result => {
          this.db
            .collection<AuthUser>('Users')
            .doc(result.user.uid)
            .get()
            .subscribe(doc => {
              if (!doc.exists) {
                // Ajout du User dans la collection Users pour les informations additionnels.
                this.db
                  .collection<AuthUser>('Users')
                  .doc(result.user.uid)
                  .set({
                    firstname: '',
                    lastname: '',
                    occupation: '',
                    companyName: '',
                    phone: '',
                    website: '',
                    addressString: JSON.stringify(this.user.address),
                    socialNetworks: JSON.stringify(this.user.socialsNetworks),
                    role: JSON.stringify(this.user.role),
                  });
              }
            });
          if (this.afauth.auth.currentUser) {
            return this.afauth.auth.currentUser
              .getIdToken(true)
              .then(idToken => {
                return { data: result.user, idToken };
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          const errorCode = error.code;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        });
    } else {
      await this.afauth.auth.signOut();
    }
  }

  async signInWithFacebook() {
    if (!this.afauth.auth.currentUser) {
      const provider = new firebase.auth.FacebookAuthProvider();

      return await this.afauth.auth
        .signInWithPopup(provider)
        .then(result => {
          this.db
            .collection<AuthUser>('Users')
            .doc(result.user.uid)
            .get()
            .subscribe(doc => {
              if (!doc.exists) {
                // Ajout du User dans la collection Users pour les informations additionnels.
                this.db
                  .collection<AuthUser>('Users')
                  .doc(result.user.uid)
                  .set({
                    firstname: '',
                    lastname: '',
                    occupation: '',
                    companyName: '',
                    phone: '',
                    website: '',
                    addressString: JSON.stringify(this.user.address),
                    socialNetworks: JSON.stringify(this.user.socialsNetworks),
                    role: JSON.stringify(this.user.role),
                  });
              }
            });

          if (this.afauth.auth.currentUser) {
            return this.afauth.auth.currentUser
              .getIdToken(true)
              .then(idToken => {
                return { data: result.user, idToken };
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          const errorCode = error.code;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        });
    } else {
      await this.afauth.auth.signOut();
    }
  }
}
