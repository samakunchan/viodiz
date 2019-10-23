export class QCMState {
  id: number;
  status: boolean; // Le status est pour le success ou failure
  score: number;
  clear() {
    this.id = undefined;
    this.status = false;
    this.score = undefined;
  }
}
export class QCMResponses {
  id: number;
  text: string;
  correct: boolean;
  clear() {
    this.id = undefined;
    this.text = '';
    this.correct = false;
  }
}
export class QCMQuestions {
  id: number;
  title;
  text: string;
  qcmResponses: QCMResponses[];
  idCorrectResponse: number;
  clear() {
    this.id = undefined;
    this.title = '';
    this.text = '';
    this.qcmResponses = [new QCMResponses()];
    this.qcmResponses.forEach(qcm => qcm.clear());
    this.idCorrectResponse = undefined;
  }
}


