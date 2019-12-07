import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { snapshotToArray } from '../config/firebaseconfig';
import { DatapassService } from '../datapass.service';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  userkey
  post = []
  poster = []
  posttag = []
  comm = []
  comment = []
  user = []
  likes = []
  com = []

  today = new Date();
  dd: number = this.today.getDate();
  mm: number = this.today.getMonth() + 1; //January is 0!

  commInput
  isComm = false
  checkComm

  showComm = false

  ref = firebase.database().ref('comments/');

  constructor(public activatedRoute: ActivatedRoute, private datapass: DatapassService, private alertCtrl: AlertController) { }

  ngOnInit() {
    if (this.datapass.logincheck === true) {
      this.showComm = true
    }
    //get postId
    this.activatedRoute.queryParams.subscribe((res) => {
      this.userkey = JSON.parse(res.postkey);
    });
    //console.log(this.userkey)

    //get a post
    firebase.database().ref('posts/').on('value', res => {
      this.post = snapshotToArray(res).filter((item) => {
        if (item.key === this.userkey) {
          return item
        }
      })
    })
    //console.log(this.post[0].key)

    //get posttag(s)
    this.posttag = this.post.map((post) => {
      return post.tag
    })



    //get poster detail
    //console.log(this.post[0].userId)

    firebase.database().ref('user/').on('value', res => {
      this.poster = snapshotToArray(res).filter((item) => {
        if (item.key === this.post[0].userId) {
          //console.log(item)
          return item
        }
      })
      console.log(this.poster[0].fname)
    })

    //getcomments
    firebase.database().ref('comments/').on('value', res => {
      this.comm = snapshotToArray(res).filter((item) => {
        if (item.postId === this.post[0].key) {
          return item
        }
      })
      this.findcomment();
      //console.log(this.comm)
    })
    firebase.database().ref('favorite/').on('value', res => {
      this.likes = snapshotToArray(res).filter((item) => {
        if (item.postId === this.post[0].key && item.userId === this.datapass.userkey) {

          return item;
        }
      })
      console.log(this.likes[0])
    })
  }



  findcomment() {
    firebase.database().ref('user/').on('value', res => {
      this.comment = this.comm.map((item) => {
        return this.user = snapshotToArray(res).filter((user) => {
          console.log(user);
          if (user.key === item.userId) {
            user.username = item.comment;
            user.password = item.date;
            return user;
          }
          console.log(this.comment);
        });
      })
    })
  }

  toggleText() {
    this.isComm = true
  }

  ccComm() {
    this.isComm = false
  }

  validateComm() {
    this.commInput == undefined || this.commInput == " " || this.commInput == null ? this.checkComm = false : this.checkComm = true
    if (this.checkComm == true) {
      let newComment = this.ref.push();


      newComment.set({
        comment: this.commInput,
        postId: this.post[0].key,
        userId: this.datapass.username,
        date: this.getToday(),
        time: this.getTime()
      })
      alert("Comment Complete")
      this.isComm = false
    }
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
  async showCheckbox() {
    let alert = await this.alertCtrl.create({
      subHeader: 'How many do you like?',
      inputs: [
        {
          name: 'like1',
          type: 'checkbox',
          label: 'Like1',
          value: 'like',
          checked: false
        },
        {
          name: 'like2',
          type: 'checkbox',
          label: 'Like2',
          value: 'like',
          checked: false
        },
        {
          name: 'like3',
          type: 'checkbox',
          label: 'Like3',
          value: 'like',
          checked: false
        },
        {
          name: 'like4',
          type: 'checkbox',
          label: 'Like4',
          value: 'like',
          checked: false
        },
        {
          name: 'like5',
          type: 'checkbox',
          label: 'Like5',
          value: 'like',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log(data);
            let newInfo = firebase.database().ref('favorite/').push();
            console.log(data);
            console.log(this.userkey);
            console.log(this.datapass.userkey);
            newInfo.set({
              like: data,
              postId: this.userkey,
              userId: this.datapass.userkey,
            })

          }
        }
      ]
    });

    await alert.present();
  }

  resetLike() {
    firebase.database().ref('favorite/').on('value', res => {
      snapshotToArray(res).filter((item) => {
        if (item.postId === this.post[0].key && item.userId === this.datapass.userkey) {
          firebase.database().ref('favorite/' + item.key).remove();

        }
      })
      //console.log(this.comm)
    })
  }


}
