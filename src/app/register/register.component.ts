import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from "../auth/auth.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild("signUpForm") signUpForm: NgForm;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }
  createAccount() {

    const user = {
      email: this.signUpForm.value.email,
      pass: this.signUpForm.value.password
    };
    this.store.dispatch(new AuthActions.TrySignUp(user));
  }
}
