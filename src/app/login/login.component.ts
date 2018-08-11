import { Component, OnInit, ViewChild } from '@angular/core';
import * as AuthActions from '../auth/auth.actions';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('signInForm') signInForm;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  login() {
    const credentials = {
      email: this.signInForm.value.email, pass: this.signInForm.value.password
    };

    this.store.dispatch(new AuthActions.TrySignIn(credentials));
  }

}
