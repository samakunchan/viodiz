import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Courses } from '..';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  createCourses(courses: Courses) {
    return this.db.collection<Courses>('Courses').add({
      title: courses.title,
      modules: courses.modules,
    });
  }

  listCourses() {
    return new Observable(observer => {
      this.db
        .collection('Courses')
        .get()
        .subscribe(res => {
          const datas = [];
          res.forEach(doc => {
            const id = { id: doc.id };
            datas.push({ ...doc.data(), ...id });
          });
          if (res) {
            observer.next(datas);
          } else {
            observer.error('Aucune données disponible');
          }
        });
    });
  }
}
