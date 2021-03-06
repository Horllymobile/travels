import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.profile = this.authService.currentUser;
  }

}
