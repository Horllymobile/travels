import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getTravels(uid): AngularFirestoreCollection{
    return this.fireStore.collection('travels', ref => ref.where('user_id', '==', uid));
  }

  createTravel(){

  }

  private uploadImage(image){

  }
}
