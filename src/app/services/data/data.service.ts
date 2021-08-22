import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private fireStore: AngularFirestore
  ) { }

  getTravels(uid): AngularFirestoreCollection{
    return this.fireStore.collection('travels', ref => ref.where('user_id', '==', uid));
  }
}
