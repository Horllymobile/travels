import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User, UserCreate } from 'src/app/models/user';
import { AlertController, LoadingController } from '@ionic/angular';

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
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loaderCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6), Validators.max(12)]]
    });
  }

  async signUp(){
    const loader = await this.loaderCtrl.create({
      message: 'Please wait while signing you up',
      animated: true,
      spinner: 'circular',
      translucent: true
    });
    try{
      await loader.present();
      const result =  await this.authService.signUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value);
      if(result) {
        const user = { ...result.user, firstName: this.signUpForm.get('firstName').value, lastName: this.signUpForm.get('lastName').value };
        await  this.authService.setUserDataSignup(user);
        await loader.dismiss();
        await this.authService.sendVerificationEmail();
      }
    }catch (error){
      const alert =  await this.alertCtrl.create({
        header: 'Error',
        message: error.message,
        buttons: ['Close']
      });
      await loader.dismiss();
      await alert.present();
    }
  }

  showPassword(){
    this.iShowPassword = !this.iShowPassword;
  }
}
