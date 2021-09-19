import { DataService } from './../../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { base64ToFile, Dimensions,ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Travel } from 'src/app/models/travel';
import { LoadingController, AlertController, AlertButton, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-travel',
  templateUrl: './new-travel.page.html',
  styleUrls: ['./new-travel.page.scss'],
})
export class NewTravelPage implements OnInit {
  createTravelForm: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  loader: any;
  alert: any;

  button: AlertButton;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private alterCtrl: AlertController,
    private platForm: Platform,
    private router: Router
  ) {
    this.platForm.backButton.subscribeWithPriority(10, () => {
      this.goHome();
    });
   }

  ngOnInit() {
    this.createTravelForm = this.formBuilder.group({
      location: [null, [Validators.required, Validators.pattern(/\w*, \w*/g)]],
      purpose: [null, [Validators.required, Validators.pattern(/\w*/g)]],
      date: [null, [Validators.required]],
      image: [null, [Validators.required]],
      expenses: [null, [Validators.required]]
    });
  }

  goHome() {
    this.router.navigate(['/', 'dashboard', 'travels']);
  }

  async createTravel(){
    try {
      this.loader = await this.loadingCtrl.create({
        message: 'Creating travel'
      });
      this.alert = await this.alterCtrl.create({
        header: 'Create Travel',
        message: 'Successfully created travels',
        buttons: ['Ok'],
      });
      this.loader.present();
      const travel: Travel = {
        location: this.createTravelForm.get('location').value,
        purpose: this.createTravelForm.get('purpose').value,
        date: this.createTravelForm.get('date').value,
        expenses: this.createTravelForm.get('expenses').value,
        imageUrl: this.croppedImage,
        pinned: false
      };
      const res = await this.dataService.createTravel(travel);
      this.loader.dismiss().then(() => {
        this.croppedImage = null;
        this.imageChangedEvent = '';
        this.alert.present();
      });

      this.createTravelForm.reset();
    } catch (error) {
      this.alterCtrl.create({
        message: error.message,
        animated: true,
        buttons: ['Close'],
        header: 'Error'
      }).then((value) => {
        console.log(value);
        this.loader.dismiss();
      });
      console.log(error);
    }
  }

  deleteImage(){
    this.imageChangedEvent = '';
    this.createTravelForm.get('image').reset();
  }

  uploadImage(event){
    console.log('change');
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = base64ToFile(event.base64);
    // console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
}

  cropperReady(sourceDimentions: Dimensions){
    console.log('Cropper Ready', sourceDimentions);
  }

  loadImageFail(){
    console.log('Load Image Fail');
  }

  back(){}

}
