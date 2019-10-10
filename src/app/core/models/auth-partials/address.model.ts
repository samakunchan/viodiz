export class Address {
  addressLine: string;
  city: string;
  postCode: string;

  clear() {
    this.addressLine = '';
    this.city = '';
    this.postCode = '';
  }
}
