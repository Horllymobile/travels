/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Travel } from 'src/app/models/travel';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }

  getTravels(uid): AngularFirestoreCollection{
    return this.fireStore.collection('travels', ref => ref.where('user_id', '==', uid));
  }

  async createTravel(travel: Travel){
    try {
      console.log(this.authService.currentUser);
      const res = await this.uploadImage(travel.imageUrl, travel.location);
      const user_id = this.authService.currentUser.email;
      const data: Travel = { ...travel, imageUrl: await res.ref.getDownloadURL(), user_id };
      await this.fireStore.collection('travels').add(data);
    } catch (error) {
      console.log(error);
    }
  }

  private uploadImage(image: string, location: string){
    return this.storage.upload(`${location}-${Date.now()}`, image);
  }
}
