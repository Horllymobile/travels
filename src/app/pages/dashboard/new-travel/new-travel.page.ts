import { Component, OnInit } from '@angular/core';
import { base64ToFile, Dimensions,ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder
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

  createTravel(){
    console.log(this.createTravelForm.value);
  }

  uploadImage(event){
    console.log('change');
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
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
