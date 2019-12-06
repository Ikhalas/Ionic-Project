import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../config/firebaseconfig';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  checkkey
  loginstatus
  name

  items = [];

  constructor(private datapass: DatapassService, private router: Router) {
    firebase.database().ref('posts/').on('value', res => {
      this.items = snapshotToArray(res).map((item) => {
        return item
      })
    })
  }

  ngOnInit() {
    /*if(this.datapass.logincheck !== true) this.router.navigateByUrl('/login'); */

    console.log(this.datapass.userkey)
    console.log(this.datapass.logincheck)
    console.log(this.datapass.name)

    this.name = this.datapass.name
    this.checkkey = this.datapass.userkey
    this.loginstatus = this.datapass.logincheck

  }




}
