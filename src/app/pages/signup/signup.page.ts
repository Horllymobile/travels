import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User, UserCreate } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  iShowPassword = false;
  loading = false;
  signUpForm: FormGroup;
  errorMessage: string;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['horlamidex1@gmail.com', [Validators.required, Validators.email]],
      password: ['horlly442', [Validators.required, Validators.min(6), Validators.max(12)]]
    });
  }

  async signUp(){
    this.loading = true;
    try{
      const result =  await this.authService.signUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value);
      if(result) {
        await this.authService.sendVerificationEmail();
        const user = { ...result.user, firstName: this.signUpForm.get('firstName').value, lastName: this.signUpForm.get('lastName').value };
        await  this.authService.setUserData(user);
      }
    }catch (error){
      this.loading = false;
      this.errorMessage = error.message;
      console.log(this.errorMessage);
    }
  }

  showPassword(){
    this.iShowPassword = !this.iShowPassword;
  }
}
