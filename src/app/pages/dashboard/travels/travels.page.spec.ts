/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

import { TravelsPage } from './travels.page';
import { DataService } from 'src/app/services/data/data.service';
import { User } from 'src/app/models/user';
import { Travel } from 'src/app/models/travel';


describe('TravelsPage', () => {
  let component: TravelsPage;
  let fixture: ComponentFixture<TravelsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelsPage ],
      imports: [],
      providers: [
        {provide: PopoverController, useClass: PopoverControllerStub},
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: DataService, useClass: DataServiceStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class AuthServiceStub {

  get currentUser(): User[]{
    return [
      {uid: '1111111', displayName: '', email: '', emailVerified: true, photoURL: ''}
    ];
  }
}

class DataServiceStub {

  getTravels(){
    return {

      valueChanges(): Observable<[]>{
        return of([]);
      }

    };
  }

}

class PopoverControllerStub{}

