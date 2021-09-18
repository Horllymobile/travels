import { DataService } from './../../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { base64ToFile, Dimensions,ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Travel } from 'src/app/models/travel';
import { LoadingController, AlertController } from '@ionic/angular';
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

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private alterCtrl: AlertController
  ) { }

  ngOnInit() {
    this.createTravelForm = this.formBuilder.group({
      location: ['', [Validators.required, Validators.pattern(/\w*, \w*/g)]],
      purpose: ['', [Validators.required, Validators.pattern(/\w*/g)]],
      date: ['', [Validators.required]],
      image: ['', [Validators.required]],
      expenses: ['', [Validators.required]]
    });
  }

  async createTravel(){
    try {
      this.loader = await this.loadingCtrl.create({
        message: 'Creating travel'
      });
      const travel: Travel = {
        location: this.createTravelForm.get('location').value,
        purpose: this.createTravelForm.get('purpose').value,
        date: this.createTravelForm.get('date').value,
        expenses: this.createTravelForm.get('expenses').value,
        imageUrl: this.croppedImage,
      };
      const res = await this.dataService.createTravel(travel);
      this.loader.dismiss();
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

  back(){

  }

}
