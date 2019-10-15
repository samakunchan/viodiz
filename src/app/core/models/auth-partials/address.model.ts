export class Address {
  addressLine: string;
  city: string;
  postCode: string;
  country: string;

  clear() {
    this.addressLine = '';
    this.city = '';
    this.postCode = '';
    this.country = '';
  }
}
