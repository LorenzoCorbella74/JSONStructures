import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './locastorage.service';



@Injectable()
export class AuthenticateService {

  users = [{
    username: 'admin',
    password: 'admin'
  }];

  constructor(
    private router: Router,
    private mem: LocalStorageService
  ) { }

  logout() {
    this.mem.clear('user');
    this.router.navigate(['/login']);
  }

  login(user) {
    const authenticatedUser = this.users.find(u => u.username === user.username);
    if (authenticatedUser && authenticatedUser.password === user.password) {
      this.mem.set('user', authenticatedUser.username);
      this.router.navigate(['/projects']);
      return true;
    }
    return false;
  }

  checkIfLogged() {
    if (this.mem.get('user') !== null) {
      return true;
    } else {
      return false;
    }
  }


}
