import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Quizz } from '../models/quizz.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import { Videos } from '../models/videos.model';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  constructor(private db: AngularFirestore) {}

  createQuizz(quizz: Quizz) {
    console.log(quizz);
    return this.db.collection<Quizz>('quizz').add({
      headTitle: quizz.headTitle,
      blockQuestion: quizz.blockQuestion,
      type: quizz.type,
      time: quizz.time,
    });
  }
  readQuizz(id: string) {
    return new Promise((resolve, reject) => {
      this.db
        .collection<Videos>('quizz')
        .doc(id)
        .get()
        .subscribe(
          doc => {
            const ids = { id: doc.id };
            resolve({ ...doc.data(), ...ids });
          },
          error1 => {
            reject(error1);
          },
        );
    });
  }
  listQuizz() {
    return new Observable(observer => {
      this.db
        .collection('quizz')
        .get()
        .subscribe((res: QuerySnapshot) => {
          const datas = [];
          const arrayTitle = [];
          res.forEach(doc => {
            const id = { id: doc.id };
            datas.push({ ...doc.data(), ...id });
            arrayTitle.push(doc.data().headTitle);
          });
          if (res) {
            observer.next({ datas, arrayTitle });
          } else {
            observer.error('Aucune données disponible');
          }
        });
    });
  }
  deleteQuizz(quizz: Quizz) {
    return this.db
      .collection<Videos>('quizz')
      .doc(quizz.id)
      .delete()
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }
}
