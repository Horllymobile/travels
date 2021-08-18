import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  iShowPassword = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signUp(values){

    this.authService.signUp(values.email, values.password);

  }

  showPassword(){
    this.iShowPassword = !this.iShowPassword;
  }
}
