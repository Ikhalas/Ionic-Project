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

  constructor(public activatedRoute: ActivatedRoute) { }

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
    //get posttag(s)
    this.posttag = this.post.map((post) =>{
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

    firebase.database().ref('comments/').on('value', res => {
      this.comm = snapshotToArray(res).filter((item) => {
        if (item.postId === this.post[0].key) {
          return item
        }
      })
      //console.log(this.comm)
    })


    
  }
}
