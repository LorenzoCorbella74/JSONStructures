import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// SERVICES
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from '../../services/locastorage.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  form: FormGroup;
  private formSubmitAttempt: boolean;

  loading: boolean = false;

  loginSub$: Subscription;
  subscription: Subscription[] = [this.loginSub$];

  constructor(
    private http: Http,
    private fb: FormBuilder,
    private auth: AuthenticateService,
    private router: Router,
    private api: ApiService,
    private mem: LocalStorageService) {

    console.warn(this.constructor.name);

  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    /* if (this.auth.isLoggedIn()) {
      this.router.navigate(['/projects']);
    } */
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }


  login() {
    if (this.form.valid) {
      const payload = this.form.value;
      this.loading = true;
      this.loginSub$ = this.http
      .post('api/signin', payload)
      .map(data=>data.json())
      .subscribe(data => {
        this.loading = false;
        console.log('User: ', data['data']);
        this.auth.setToken(data['token']);
        this.mem.set('user', data['data']);
        this.router.navigate(['/projects']);
      },
        err => {
          console.log('Error occured in login.');
          this.loading = false;
        });
    }
  }

}
