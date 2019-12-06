import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { snapshotToArray } from '../config/firebaseconfig';
import { DatapassService } from '../datapass.service';
import * as firebase from 'firebase';

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

  today = new Date();
  dd: number = this.today.getDate();
  mm: number = this.today.getMonth() + 1; //January is 0!

  commInput
  isComm = false
  checkComm

  ref = firebase.database().ref('comments/');

  constructor(public activatedRoute: ActivatedRoute, private datapass: DatapassService) { }

  ngOnInit() {
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
  }

  findcomment(){
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


}
