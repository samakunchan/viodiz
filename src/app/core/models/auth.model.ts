import { Address } from './auth-partials/address.model';
import { SocialsNetworks } from './auth-partials/socials-networks.model';

export class AuthUser {
  uid: number;
  displayName: string;
  firstname: string;
  lastname: string;
  photoUrl: string;
  email: string;
  password: string;
  emailVerified: boolean;
  address: Address;
  job: string;
  phone: string;
  socialsNetworks: SocialsNetworks;
  website: string;
  role: string;

  clear() {
    this.uid = undefined;
    this.displayName = '';
    this.firstname = '';
    this.lastname = '';
    this.photoUrl = '';
    this.email = '';
    this.password = '';
    this.emailVerified = false;
    this.address = new Address();
    this.address.clear();
    this.job = '';
    this.phone = '';
    this.socialsNetworks = new SocialsNetworks();
    this.socialsNetworks.clear();
    this.website = '';
    this.role = '';
  }
}
