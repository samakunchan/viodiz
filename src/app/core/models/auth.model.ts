import { Address } from './auth-partials/address.model';
import { SocialsNetworks } from './auth-partials/socials-networks.model';
import { Students } from './students.model';

export class AuthUser {
  uid: string;
  displayName: string;
  firstname: string;
  lastname: string;
  photoUrl: string;
  email: string;
  password: string;
  emailVerified: boolean;
  address: Address;
  job: string;
  companyName: string;
  phone: string;
  socialsNetworks: SocialsNetworks;
  website: string;
  role: string;
  aboutMe: string;
  isStudent: boolean;
  student?: Students;

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
    this.companyName = '';
    this.phone = '';
    this.socialsNetworks = new SocialsNetworks();
    this.socialsNetworks.clear();
    this.website = '';
    this.role = '';
    this.aboutMe = '';
    this.isStudent = false;
  }
  clearStudent() {
    this.student = new Students();
    this.student.clear();
  }
}
