// Cette class est pour les scores des quizz
export class QCMState {
  // TODO A changer en QuizzState
  id: number;
  status: boolean; // Le status est pour le success ou failure
  score: number;
  clear() {
    this.id = undefined;
    this.status = false;
    this.score = undefined;
  }
}
export class ResQCM {
  expected: boolean;
  response: string;
}
export class ResTrueFalse {
  responseTrue: boolean;
  responseFalse: boolean;
}
export class Quizz {
  id?: string;
  headTitle: string;
  blockQuestion: ResQCM[] | ResTrueFalse[];
  type: string;
  time: string;
  clear?(): void {
    this.id = '';
    this.headTitle = '';
    this.blockQuestion = [];
    this.time = '';
  }
}
