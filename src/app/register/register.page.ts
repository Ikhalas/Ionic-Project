import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';
import { snapshotToArray } from '../config/firebaseconfig'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  emptyfname
  emptylname
  emptyuname
  emptypass
  emptycpass

  uname
  pass
  cpass

  repeatedUser

  firstname
  lastname
  username
  password
  cpassword

  infos = [];
  ref = firebase.database().ref('user/');

  constructor(private router: Router) {
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    });
  }


  validate() {
    // undefine check
    this.firstname == undefined || this.firstname == null || this.firstname == "" ? this.emptyfname = false : this.emptyfname = true
    this.lastname == undefined || this.lastname == null || this.lastname == "" ? this.emptylname = false : this.emptylname = true
    this.username == undefined || this.username == null || this.username == "" ? this.emptyuname = false : this.emptyuname = true
    this.password == undefined || this.password == null || this.password == "" ? this.emptypass = false : this.emptypass = true
    this.cpassword == undefined || this.cpassword == null || this.cpassword == "" ? this.emptycpass = false : this.emptycpass = true

    // invalid check
    this.username.length <= 5 ? this.uname = false : this.uname = true;
    this.password.length <= 5 ? this.pass = false : this.pass = true;
    this.password !== this.cpassword ? this.cpass = false : this.cpass = true

    // repeatedUser check
    for (let data of this.infos) {
      if(data.username === this.username){
        this.repeatedUser = false
      }
      else{
        this.repeatedUser = true
      }
    }

    if (this.emptyfname && this.emptylname && this.emptyuname && this.emptypass && this.emptycpass
      && this.uname && this.pass && this.cpass && this.repeatedUser === true) {
      console.log("you can register")
      this.register()
    }
    else {
      console.log("you can't register")
    }

  }
  register() {
    
    let newInfo = this.ref.push();
    newInfo.set({
      username: this.username,
      password: this.password,
      fname: this.firstname,
      lname: this.lastname
    })
    alert("Register Complete")
    this.router.navigate(['/login']);
  }
}
