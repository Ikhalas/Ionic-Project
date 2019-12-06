import { DatapassService } from '../datapass.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';
import { snapshotToArray } from '../config/firebaseconfig'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username;
  password;

  check;

  infos = [];
  ref = firebase.database().ref('user/');

  constructor(private router: Router, private datapass: DatapassService) {
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    });
  }

  login() {
    
    let found = false;

    for (let data of this.infos) {
      if (data.username === this.username && data.password === this.password) {  
        //console.log(data.key)
        //console.log(data.username)
        found = true;
        this.datapass.name = data.fname
        this.datapass.surname = data.lname
        this.datapass.userkey = data.key
        this.datapass.logincheck = found
        this.datapass.avatar = data.avatar

        console.log(this.datapass.userkey)
        console.log(this.datapass.name)
        console.log(this.datapass.logincheck)
        

        this.router.navigateByUrl('/maintabs/tab1');
        break
      }
      found === false ? this.check = false : this.check = true
      
    }
  }

}
