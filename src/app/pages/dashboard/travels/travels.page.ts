import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth/auth.service';
import { DataService } from './../../../services/data/data.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../../../components/popover/popover.component';
import { Travel } from 'src/app/models/travel';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {
  user: User;
  pinned: Travel | undefined;
  travels$: Observable<Travel[]> | undefined;
  online = navigator.onLine;
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    if(this.online){
      this.user = this.authService.loginUser;
      this.travels$ =  this.dataService.getTravels(this.user.email).valueChanges() as Observable<Travel[]>;
      this.travels$.subscribe({
        next: (travels) => {
          console.log(travels);
          this.pinned = travels.find(travel => travel.pinned === true);
          console.log(this.pinned);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
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
  }

  converTimeStampToDate(timeStamp: any){
    const date = new Date(timeStamp.seconds * 1000).getTime();
    return date;
  }

  doRefresh(event){
    console.log(this.user);
    this.dataService.getTravels(this.user.email).valueChanges()
    .subscribe((data: Travel[]) => {
      // this.travels = data.sort((a, b) => this.sortExpenses(a, b));
    }, err => console.log(err));
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
  sortExpenses(first: Travel, last: Travel){
    return first.expenses - last.expenses;
  }
}
