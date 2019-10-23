class Name {
  given_name: string;
  surname: string;
  clear() {
    this.given_name = '';
    this.surname = '';
  }
}
class Payer {
  email_address: string;
  name: Name;
  payer_id: string;
  clear() {
    this.email_address = '';
    this.name = new Name();
    this.name.clear();
    this.payer_id = '';
  }
}
class Payee {
  email_address: string;
  merchant_id: string;
  clear() {
    this.email_address = '';
    this.merchant_id = '';
  }
}
export class PaypalInfos {
  create_time: string;
  id: string;
  payer: Payer;
  payee: Payee;
  status: string;
  clear() {
    this.create_time = '';
    this.id = '';
    this.status = '';
    this.payer = new Payer();
    this.payer.clear();
    this.payee = new Payee();
    this.payee.clear();
  }
}
