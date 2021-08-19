import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.page.html',
  styleUrls: ['./verify-page.page.scss'],
})
export class VerifyPagePage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.userData;
  }

  // ionViewDidEnter(): void {
  //   this.user = this.authService.userData;
  //   console.log(this.user);
  // }

  sendVerificationEmail(){
    this.authService.sendVerificationEmail();
  }
}
