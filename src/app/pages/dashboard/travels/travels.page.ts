import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth/auth.service';
import { DataService } from './../../../services/data/data.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../../../components/popover/popover.component';
import {AngularFirestoreDocument} from "@angular/fire/firestore";
@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {
  user: any;
  travels: any[];
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.authService.currentUser[1] ? this.authService.currentUser[1] : this.authService.currentUser[0];
      console.log(this.user);
      this.dataService.getTravels(this.user.uid).valueChanges()
      .subscribe(data => {
        this.travels = data;
        console.log(this.travels);
      }, err => console.log(err));
    }, 100);
  }

  async popover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: '',
      event: ev,
      translucent: true
    });

    await popover.present();
    const { role } = await popover.onDidDismiss();
    console.log(role);
  }

  converTimeStampToDate(timeStamp: any){
    const date = new Date(timeStamp.seconds * 1000).getTime();
    return date;
  }

}
