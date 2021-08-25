import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NewTravelPageRoutingModule } from './new-travel-routing.module';

import { NewTravelPage } from './new-travel.page';

describe('NewTravelPage', () => {
  let component: NewTravelPage;
  let fixture: ComponentFixture<NewTravelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewTravelPage],
      imports: [
        IonicModule.forRoot(),
        NewTravelPageRoutingModule,
        ReactiveFormsModule,
        ImageCropperModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
