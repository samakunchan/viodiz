import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Videos } from '../models/videos.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private db: AngularFirestore) {}

  createVideos(video: Videos) {
    return this.db.collection<Videos>('videos').add({
      title: video.title,
      url: video.url,
      type: video.type,
    });
  }
  readVideo(id: string) {
    return new Promise((resolve, reject) => {
      this.db
        .collection<Videos>('videos')
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
  updateVideo(video: Videos) {
    return new Promise((resolve, reject) => {
      this.db
        .collection<Videos>('videos')
        .doc(video.id)
        .update({
          title: video.title,
          type: video.type,
          url: video.url,
        })
        .then(res => resolve(res))
        .catch(err => reject(err));
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
  deleteVideos(video: Videos) {
    return this.db
      .collection<Videos>('videos')
      .doc(video.id)
      .delete()
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }
}
