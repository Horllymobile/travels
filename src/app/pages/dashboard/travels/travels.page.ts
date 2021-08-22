import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth/auth.service';
import { DataService } from './../../../services/data/data.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../../../components/popover/popover.component';
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
    private popoverControler: PopoverController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.authService.currentUser[1];
      this.dataService.getTravels(this.user.uid).valueChanges()
      .subscribe(data => {
        this.travels = data;
      }, err => console.log(err));
    }, 500);
  }

  async popover(ev: any) {
    const popover = await this.popoverControler.create({
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
