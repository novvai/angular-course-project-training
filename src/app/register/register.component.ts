import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../common/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild("signUpForm") signUpForm: NgForm;
  constructor(private authentication: AuthService) { }

  ngOnInit() {

  }
  createAccount() {

    const email = this.signUpForm.value.email,
      password = this.signUpForm.value.password;
      console.log(email,password);
      this.authentication.signUp(email, password);
  }
}
