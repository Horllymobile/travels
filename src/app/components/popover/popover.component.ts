import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {}

 async dismissPopover(){
      this.popoverController.dismiss();
  }

  async profilePage(){
    await this.router.navigateByUrl('/dashboard/profile');
    await this.popoverController.dismiss();
  }

  logout(){

    this.authService.signOut()
    .then(
     () => {
       this.popoverController.dismiss();
     }
    )
    .catch(err => console.log(err));

  }



}
