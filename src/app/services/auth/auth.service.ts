import { Injectable, NgZone } from '@angular/core';
import { User } from './../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;


  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get currentUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    // this.userData = user.providerData;
    return user.providerData;
  }

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {

    this.angularFireAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
   }

   signIn(email: string, password: string){
     return this.angularFireAuth.signInWithEmailAndPassword(email, password)
     .then((result) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/dashboard');
      });
      this.setUserData(result.user);
     }).catch(async (error) => {
      // window.alert(error.message);
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      });

      await alert.present();
     });
   }

   signUp(email: string, password: string){
     return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
     .then((result) => {
       this.sendVerificationEmail();
       this.setUserData(result.user);
     });
   }
  sendVerificationEmail() {
    return this.angularFireAuth.currentUser.then((result) => {
      result.sendEmailVerification().then(() => {
        this.router.navigateByUrl('verify-email-address');
      });
    });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  googleAuth(){
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider){
    return this.angularFireAuth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/dashboard');
      });
      this.setUserData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  setUserData(user: User){
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut(){
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/signin');
    });
  }
}
