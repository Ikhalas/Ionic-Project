import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {snapshotToArray} from '../config/firebaseconfig';
import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  name
  surname

  items = [];
  num:number = 0;
  ref = firebase.database().ref('posts/')

  constructor(private datapass: DatapassService, private router: Router) { 
    this.ref.on('value', res =>{
      this.items = snapshotToArray(res).filter((item)=>{
        if(item.userId === this.datapass.userkey){
          this.num = 1;
          return item;
        }
        this.num = 2;
      });
    })
  }

  ngOnInit() {
    if(this.datapass.logincheck !== true) this.router.navigateByUrl('/login');

    this.name = this.datapass.name
    this.surname = this.datapass.surname
  }

  goToNewPost(){
    this.router.navigateByUrl('/maintabs/tab2');
  }

  logout(){
    this.datapass.logincheck = false
    this.router.navigateByUrl('/home/nonlogintab')
  }

}
