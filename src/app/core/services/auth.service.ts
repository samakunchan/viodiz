import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as toastr from '../../../assets/js/toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthNoticeService } from '../auth-notice/auth-notice.service';
import { Sha256 } from '../_class/sha256';
import { AuthUser } from '..';
import { Students } from '../models/students.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: AuthUser;
  private defaultRole: string;
  constructor(
    private afauth: AngularFireAuth,
    private afstorage: AngularFireStorage,
    private db: AngularFirestore,
    private translate: TranslateService,
    private authNoticeService: AuthNoticeService,
  ) {
    this.user = new AuthUser();
    this.user.clear();
    this.defaultRole = 'USER';
    this.loadToastrOptions();
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

  signIn(email: string, password: string) {
    return this.afauth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        return this.afauth.auth.currentUser
          .getIdToken(true)
          .then(idToken => {
            return { data: credential.user, idToken };
          })
          .catch(() => {
            return toastr.info(this.translate.instant('AUTH.NOTIFICATIONS.LOGIN.DATAFAILURE'), this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
          });
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          toastr.info(this.translate.instant('AUTH.NOTIFICATIONS.LOGIN.FAILURE'), this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
        } else {
          toastr.info(error.message, this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
        }
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
                    job: '',
                    companyName: '',
                    phone: '',
                    website: '',
                    addressString: JSON.stringify(this.user.address),
                    socialNetworks: JSON.stringify(this.user.socialsNetworks),
                    role: this.defaultRole,
                    aboutMe: '',
                    isStudent: false
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
            toastr.info(this.translate.instant('AUTH.NOTIFICATIONS.LOGIN.ACCOUNTEXIST'), this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
          } else {
            toastr.info(error.message, this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
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
                    job: '',
                    companyName: '',
                    phone: '',
                    website: '',
                    addressString: JSON.stringify(this.user.address),
                    socialNetworks: JSON.stringify(this.user.socialsNetworks),
                    role: this.defaultRole,
                    aboutMe: '',
                    isStudent: false,
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
            toastr.info(this.translate.instant('AUTH.NOTIFICATIONS.LOGIN.ACCOUNTEXIST'), this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
          } else {
            toastr.info(error.message, this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
          }
        });
    } else {
      await this.afauth.auth.signOut();
    }
  }
  signOut() {
    return this.afauth.auth.signOut();
  }

  register(user: AuthUser): Promise<any> {
    return this.afauth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        // Update immédiat du profil pour le displayName
        this.afauth.auth.currentUser.updateProfile({ displayName: user.displayName });

        // Ajout du User dans la collection Users pour les informations additionnels.
        this.db
          .collection<AuthUser>('Users')
          .doc(result.user.uid)
          .set({
            firstname: '',
            lastname: '',
            job: '',
            companyName: '',
            phone: '',
            website: '',
            addressString: JSON.stringify(this.user.address),
            socialNetworks: JSON.stringify(this.user.socialsNetworks),
            role: this.defaultRole,
            aboutMe: '',
            isStudent: false,
          });

        // Création du token pour le cloud function afin de gérer la reconnextion.
        return this.afauth.auth.currentUser
          .getIdToken(true)
          .then(() => {
            return { data: result.user };
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          this.authNoticeService.setNotice(this.translate.instant('AUTH.NOTIFICATIONS.REGISTER.USED'), 'danger');
        } else {
          this.authNoticeService.setNotice(error.message, 'danger');
        }
      });
  }
  passwordForgot(email: string) {
    return this.afauth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        toastr.success(this.translate.instant('AUTH.NOTIFICATIONS.PASSWORD.SUCCESS'), this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          toastr.warning(this.translate.instant('AUTH.NOTIFICATIONS.PASSWORD.INVALIDEMAIL'), this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
        } else if (errorCode === 'auth/user-not-found') {
          toastr.warning(this.translate.instant('AUTH.NOTIFICATIONS.PASSWORD.INVALIDUSER'), this.translate.instant('AUTH.NOTIFICATIONS.TITLE'));
        }
      });
  }
  sendMailVerification() {
    return new Promise((resolve, reject) => {
      this.afauth.auth.currentUser
        .sendEmailVerification()
        .then(() => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }
  buildingBeforeUpdate(_user) {
    return new Promise((resolve, reject) => {
      this.getAuthUser().subscribe(
        (userData: AuthUser) => {
          _user.uid = userData.uid;
          _user.email = userData.email;
          _user.displayName = userData.displayName;
          _user.emailVerified = userData.emailVerified;
          resolve(_user);
        },
        error => {
          reject(error);
        },
      );
    });
  }
  createAuthUserStudent(_student): Observable<Students> {
    return new Observable<Students>(observer => {
      this.db
        .collection<AuthUser>('Users')
        .doc(_student.uid)
        .collection('Student')
        .doc(_student.coursesFollowed[0].title)
        .set({
          studentUid: _student.uid,
          coursesFollowed: _student.coursesFollowed,
          qcmState: JSON.stringify(_student.qcmState),
          idGroupe: _student.idGroupe,
          certificat: JSON.stringify(_student.certificat),
          createAt: _student.createAt,
          productId: _student.productId
        })
        .then(() => observer.next(_student))
        .catch(err => {
          observer.error(err);
        });
    });
  }
  updateAuthUserProfilPhoto(_user: AuthUser): Observable<any> {
    return new Observable(observer => {
      this.afauth.authState.subscribe(
        user => {
          user
            .updateProfile({
              photoURL: _user.photoUrl,
            })
            .then(res => observer.next(res))
            .catch(err => {
              observer.error(err);
            });
        },
        error => observer.error(error),
      );
    });
  }
  updateAuthUserProfil(_user): Observable<AuthUser> {
    return new Observable<AuthUser>(observer => {
      this.db
        .collection<AuthUser>('Users')
        .doc(_user.uid)
        .update({
          firstname: _user.firstname ? _user.firstname : '',
          lastname: _user.lastname,
          job: _user.job,
          companyName: _user.companyName,
          phone: _user.phone,
          website: _user.website,
          role: _user.role,
          addressString: JSON.stringify(_user.address),
          socialsNetworks: JSON.stringify(_user.socialsNetworks),
          aboutMe: _user.aboutMe,
          isStudent: _user.isStudent
        })
        .then(() => observer.next(_user))
        .catch(err => {
          observer.error(err);
        });
    });
  }
  uploadFile(file, path, email) {
    return new Promise((resolve, reject) => {
      const photoNameHashed = new Sha256();
      photoNameHashed.hashString(email);
      const upload = firebase
        .storage()
        .ref('/images')
        .child(`users/${path}-${photoNameHashed.result}`)
        .put(file);
      return upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        error => {
          console.log('Erreur de chargement ! : ' + error.message);
          reject(error.message);
        },
        () => {
          return upload.snapshot.ref
            .getDownloadURL()
            .then(photoUrl => {
              this.getAuthUser().subscribe(
                (userData: AuthUser) => {
                  userData.photoUrl = photoUrl;

                  resolve(userData);
                },
                error => reject(error),
              );
            })
            .catch(error => {
              console.log(error);
            });
        },
      );
    });
  }

  getAuthUser() {
    return new Observable(observer => {
      this.afauth.authState.subscribe(
        userCred => {
          if (userCred) {
            this.user.clear();
            this.db
              .collection<AuthUser>('Users')
              .doc(userCred.uid)
              .get()
              .subscribe(
                res => {
                  this.user.uid = userCred.uid;
                  this.user.displayName = userCred.displayName;
                  this.user.email = userCred.email;
                  this.user.emailVerified = userCred.emailVerified;
                  this.user.photoUrl = userCred.photoURL;
                  this.user.firstname = res.data().firstname;
                  this.user.lastname = res.data().lastname;
                  this.user.job = res.data().job;
                  this.user.phone = res.data().phone;
                  this.user.companyName = res.data().companyName;
                  this.user.address = JSON.parse(res.data().addressString);
                  this.user.socialsNetworks = JSON.parse(res.data().socialsNetworks);
                  this.user.role = res.data().role;
                  this.user.aboutMe = res.data().aboutMe;
                  this.user.isStudent = res.data().isStudent;
                  observer.next(this.user);
                },
                error1 => {
                  observer.error(error1);
                },
              );
          } else {
            observer.error('Missing user');
          }
        },
        error => observer.error(error),
      );
    });
  }
  getStudent(_student: AuthUser) {
    return new Observable(observer => {
      return this.db
        .collection<AuthUser>('Users')
        .doc(_student.uid)
        .collection('Student')
        .get()
        .subscribe(res => {
          const data = [];
          res.docs.map(student => {
            data.push(student.data());
          });
          return observer.next(data);
        });
    });
  }
  loadToastrOptions() {
    return (toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
    });
  }
}
