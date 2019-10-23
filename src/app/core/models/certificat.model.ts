export class Certificat {
  status: boolean;
  documentUrl: string;
  expireAt: string;
  clear() {
    this.status = false;
    this.documentUrl = '';
    this.expireAt = '';
  }
}
