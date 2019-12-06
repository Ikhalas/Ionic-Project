import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';
import { DatapassService } from '../datapass.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  title
  review

  today = new Date();
  dd: number = this.today.getDate();
  mm: number = this.today.getMonth() + 1; //January is 0!

  nToday
  nTime

  Mac
  iPhone
  iPad
  Watch

  image_base64:any;

  preImage = '/assets/img/no-image.png'

  emptytitle = false
  emptyreview = false
  emptytag = false

  ref = firebase.database().ref('posts/');

  constructor(private datapass: DatapassService, private router: Router, private camera: Camera) { }

  ngOnInit() {
    if (this.datapass.logincheck !== true) this.router.navigateByUrl('/login');
  }


  selectedTag: any = [];

  validate() {
    this.title == undefined || this.title == null || this.title == "" ? this.emptytitle = true : this.emptytitle = false;
    this.review == undefined || this.review == null || this.review == "" ? this.emptyreview = true : this.emptyreview = false;

    if (this.Mac === undefined || this.Mac === false && this.iPhone === undefined || this.iPhone === false &&
      this.iPad === undefined || this.iPad === false && this.Watch === undefined || this.Watch === false) {
      this.emptytag = true
    }
    else {
      this.emptytag = false
    }

    if (this.Mac == true) {
      this.selectedTag.push("Mac")
    }

    if (this.iPhone == true) {
      this.selectedTag.push("iPhone")
    }

    if (this.iPad == true) {
      this.selectedTag.push("iPad")
    }

    if (this.Watch == true) {
      this.selectedTag.push("Watch")
    }


    this.nToday = this.getToday()
    this.nTime = this.getTime()

    console.log(this.nTime)
    console.log(this.nToday)
    console.log(this.title)
    console.log(this.review)
    console.log(this.selectedTag);
    console.log(this.selectedTag.length);

    if (this.emptytitle === false || this.emptyreview === false || this.selectedTag.length > 0) {
      console.log("can upload")
      this.submit()
    }
    else {
      console.log("can,t upload")
    }
  }

  submit() {
    let newInfo = this.ref.push();
    newInfo.set({
      title: this.title,
      detail: this.review,
      like: 0,
      pathPicture: this.preImage,
      tag: this.selectedTag,
      date: this.nToday,
      time: this.nTime,
      userId: this.datapass.userkey
    })
    alert("Review Complete")
    this.router.navigate(['/maintabs/tab1']);
  }


  getToday() {
    var yyyy = this.today.getFullYear();
    if (this.dd < 10) {
      this.dd = 0 + this.dd;
    }
    if (this.mm < 10) {
      this.mm = 0 + this.mm;
    }
    var newToday = this.dd + '/' + this.mm + '/' + yyyy;
    return newToday
  }

  getTime() {
    var d = new Date().toString()
    var res = d.substring(16, 21);
    return res
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image_base64 = base64Image;
      this.preImage =  this.image_base64
    }, (err) => {
      console.log(err);
    });
  }



}
