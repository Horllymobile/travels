import { SignupPage } from './../../pages/signup/signup.page';
import { TestBed } from '@angular/core/testing';

import { SigninUpGuard } from './signin-up.guard';

describe('SigninUpGuard', () => {
  let guard: SigninUpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: []
    });
    guard = TestBed.inject(SigninUpGuard);
  });

  // it('should be created', () => {
  //   expect(guard).toBeTruthy();
  // });
});
