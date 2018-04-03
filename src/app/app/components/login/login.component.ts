import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/locastorage.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  showSpinner: boolean = false;




  constructor(private auth: AuthenticateService) {
  }

  ngOnInit() {
  }

  login() {
    if(!this.auth.login({ username: this.username, password: this.password})) {
     console.log('Failed to login! try again ...');
    }
  }

  /* ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/projects']);
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data => {
        this.auth.setToken(data.token);
        this.router.navigate(['/projects']);
      });
  } */

}
