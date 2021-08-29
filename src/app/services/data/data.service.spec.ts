import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
        AngularFireStorage,
        AuthService
      ],
    });
    service = TestBed.inject(DataService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
