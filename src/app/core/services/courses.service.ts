import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Courses } from '..';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Videos } from '../models/videos.model';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  createCourses(courses: Courses) {
    return this.db.collection<Courses>('modules').add({
      title: courses.title,
      modules: courses.modules,
    });
  }
  createVideos(video: Videos) {
    return this.db.collection<Videos>('videos').add({
      title: video.title,
      url: video.url,
      type: video.type,
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
  listVideos() {
    return new Observable(observer => {
      this.db
        .collection('videos')
        .get()
        .subscribe((res: QuerySnapshot) => {
          const datas = [];
          const arrayTitle = [];
          res.forEach(doc => {
            const id = { id: doc.id };
            datas.push({ ...doc.data(), ...id });
            arrayTitle.push(doc.data().title);
          });
          if (res) {
            observer.next({ datas, arrayTitle });
          } else {
            observer.error('Aucune données disponible');
          }
        });
    });
  }
  uploadVideo(file, path) {
    return new Promise((resolve, reject) => {
      const upload = firebase
        .storage()
        .ref('/video')
        .child(`courses/${path}`)
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
            .then(videoUrl => {
              resolve(videoUrl);
            })
            .catch(error => {
              console.log(error);
            });
        },
      );
    });
  }

  deleteCourses() {}
  deleteVideos(video: Videos) {
    return this.db
      .collection<Videos>('videos')
      .doc(video.id)
      .delete()
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }
}
