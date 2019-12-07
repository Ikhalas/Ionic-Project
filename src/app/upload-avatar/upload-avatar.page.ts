import { DatapassService } from './../datapass.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FIREBASE_CONFIG, snapshotToArray } from '../config/firebaseconfig';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.page.html',
  styleUrls: ['./upload-avatar.page.scss'],
})
export class UploadAvatarPage implements OnInit {
  image_base64: any;
  userAvatar: any;
  constructor(private router: Router, private camera: Camera, private datapass: DatapassService) { }

  ngOnInit() {
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image_base64 = base64Image;
    }, (err) => {
      console.log(err);
    });
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
    }, (err) => {
      console.log(err);
    });
  }
  uploadAvatar() {
    firebase.database().ref('user/').on('value', res => {
      snapshotToArray(res).filter((user) => {
        if (user.key === this.datapass.userkey) {
          firebase.database().ref('user/' + user.key).update({ avatar: this.image_base64 });
          this.datapass.avatar = this.image_base64;
          alert("Success!!");
          this.router.navigate(['/maintabs/tab4']);
        }
      });
    })
  }
  cancel() {
    this.image_base64 = "";
  }

}
