import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth/auth.service';
@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {
  user: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.authService.currentUser;
      console.log(this.user);
    }, 1000);
  }

}
