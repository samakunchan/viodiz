import { Courses } from './courses.model';
import { QCMState } from './qcm.model';
import { Certificat } from './certificat.model';

export class Students {
  uid: string;
  isStudent: boolean;
  coursesFollowed: Courses[];
  qcmState: QCMState;
  idGroupe: number;
  certificat: Certificat;
  clear() {
    this.uid = '';
    this.isStudent = false;
    this.coursesFollowed = [new Courses()];
    this.coursesFollowed.forEach(course => course.clear());
    this.qcmState = new QCMState();
    this.qcmState.clear();
    this.idGroupe = undefined;
    this.certificat = new Certificat();
    this.certificat.clear();
  }
}
