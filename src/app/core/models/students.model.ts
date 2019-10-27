import { Courses } from './courses.model';
import { QCMState } from './qcm.model';
import { Certificat } from './certificat.model';

export class Students {
  uid: string;
  coursesFollowed: Courses[];
  qcmState: QCMState;
  idGroupe: number;
  certificat: Certificat;
  createAt: string;
  productId: string;
  clear() {
    this.uid = '';
    this.coursesFollowed = [];
    this.coursesFollowed.forEach(course => course.clear());
    this.qcmState = new QCMState();
    this.qcmState.clear();
    this.idGroupe = 0;
    this.certificat = new Certificat();
    this.certificat.clear();
    this.createAt = '';
    this.productId = '';
  }
}
