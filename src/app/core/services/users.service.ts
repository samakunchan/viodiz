import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  loadAllUsers() {
    return new Observable(observer => {
      const listUsers = firebase.functions().httpsCallable('listUsers');
      listUsers()
        .then(result => observer.next(result.data.result))
        .catch(error => observer.error(error));
    });
  }
}
