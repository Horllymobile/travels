import { AuthService } from './../../services/auth/auth.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UrlSerializer } from '@angular/router';

describe('SignupPage', () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPage ],
      imports: [
        ReactiveFormsModule,
        IonicModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: UrlSerializer, useClass: UrlSerializerStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


class UrlSerializerStub{

  urlSerializer(){
    return {
      serialize: () => {}
    };
  }

}

class AuthServiceStub {
  signUpForm: FormGroup;
  private formBuilder: FormBuilder;
  constructor(
  ){
    this.formBuilder = new FormBuilder();
    this.signUpForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }
}
