import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './locastorage.service';

export interface User {
  userName: string;
  password: string;
}

@Injectable()
export class AuthenticateService {

  // private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  storageKey: string = 'contact-manager-jwt';

  constructor(
    private router: Router,

    private mem: LocalStorageService
  ) { }

  setToken(token: string) {
    this.mem.set(this.storageKey, token);
  }

  getToken() {
    return this.mem.get(this.storageKey);
  }

  logout() {
    // this.loggedIn.next(false);
    this.mem.clear('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if (this.getToken() !== null || this.getToken() !== undefined) {
      return true;
    }
    return false;
    // return this.loggedIn.asObservable();
  }
}
