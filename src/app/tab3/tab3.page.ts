import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../config/firebaseconfig';
import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  items = [];
  favs = [];
  posts = [];
  num: number = 0;
  constructor(private datapass: DatapassService, private router: Router) {
    if (this.datapass.logincheck !== true) this.router.navigateByUrl('/login');

    firebase.database().ref('favorite/').on('value', res => {
      this.items = snapshotToArray(res).filter((item) => {
        if (item.userId === this.datapass.userkey) {
          this.num = 1;
          return item;
        }
        this.num = 2;
      });
      this.findFav();
    })
  }


  findFav() {
    firebase.database().ref('posts/').on('value', res => {
      this.favs = this.items.map((item) => {
        return this.posts = snapshotToArray(res).filter((post) => {
          console.log(post);
          if (post.key === item.postId) {
            post.like = item.like;
            console.log(item);
            console.log(post);
            return post;
          }
          console.log(this.favs);
        });
      })
    })
  }
}
