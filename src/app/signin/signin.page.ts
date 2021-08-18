import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  iShowPassword = false;
  loginForm: FormGroup;
  constructor(
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }

  ngOnInit() {}


  loginWithGoogle() {

  }

  signIn(values){
    this.authService.signIn(values.email, values.password)
    .then(() => {
      console.log('welcome');
    })
    .catch(err => console.log(err));
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
