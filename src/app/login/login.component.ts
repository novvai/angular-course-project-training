import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../common/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('signInForm') signInForm;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.auth.signIn(this.signInForm.value.email, this.signInForm.value.password);
  }
  
}
