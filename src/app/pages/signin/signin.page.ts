/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import {  } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { DOCUMENT } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninPage implements OnInit, OnDestroy {
  iShowPassword = false;
  loading = true;
  errorMessage: string;
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private _document,
    private router: Router,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]]
    });

    // document.body.classList.add('bodyBg');

   }

  get formValues(){
    return this.loginForm.value;
  }

  ngOnInit() {
    // this._document.body.classList.add('bodyBg');
  }

  ngOnDestroy() {

  }


  loginWithGoogle() {
    this.authService.googleAuth();
  }

  async signIn(){
    let loader;
    let alert;
    try{
      alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Your email is not verified yet',
        animated: true,
        id: 'error-verify',
        buttons: ['Close']
      });
      loader = await this.loaderCtrl.create({
        animated: true,
        message: 'Please wait while login you in',
        spinner: 'bubbles',
        duration: 5000
      });
      await loader.present();
      const result = await  this.authService.
      signIn(this.loginForm.controls.userEmail.value, this.loginForm.controls.userPassword.value);
      if(!result.user.emailVerified){
        await alert.present();
        await loader.dismiss();
        return;
      }
      await this.authService.setUserData(result.user);
      await this.router.navigateByUrl('/dashboard');
      await loader.dismiss();
    }catch (error){
      alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.message,
        animated: true,
        id: 'error-signin',
        buttons: ['Close']
      });
      await loader.dismiss();
      await alert.present();
    }
  }

  async presentLoadingWithOptions() {
    const loading = await this.loaderCtrl.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  showPassword(){
    this.iShowPassword = !this.iShowPassword;
  }

}
