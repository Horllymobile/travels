/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import {  } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninPage implements OnInit, OnDestroy {
  iShowPassword = false;
  loginForm: FormGroup;
  constructor(
    private loadingController: LoadingController,
    private authService: AuthService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private _document
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

  signIn(){
    console.log(this.formValues);
    this.authService.signIn(this.formValues.userEmail, this.formValues.userPassword)
    .then(() => {
      // this.loginForm.reset();
    })
    .catch(err => {
      console.log(err);
    });
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
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
