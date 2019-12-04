import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{
  uname = true
  pass = true
  fname = true
  lname = true
  cpass = true

  firstname
  lastname
  username
  password
  cpassword

  constructor() { }

  ngOnInit(){

  }

  register(){

    let check1  = this.allLetter(this.firstname)
    let check2  = this.allLetter(this.lastname)
    check1 == false ? this.fname = false : this.fname = true
    check2 == false ? this.lname = false : this.lname = true

    this.username.length <= 5 ? this.uname = false : this.uname = true;
    this.password.length <= 5 ? this.pass = false : this.pass = true;
      
    this.password == this.cpassword ? this.cpass = false : this.cpass = true
  


    console.log(this.firstname.length)
    console.log(this.lastname)
    console.log(this.username)
    console.log(typeof(this.password))
    console.log(this.cpassword)

  }

  allLetter(txt){
   var letters = /^[A-Za-z]+$/;
   if(txt.match(letters)) return true
   else return false   
  }

  allLetterAndnumber()
  {
   var letters = /^[0-9a-zA-Z]+$/;
   if(this.username.match(letters))
     {
      alert("valid");
     }
   else
     {
     alert("Please input alphabet characters only");
     }
  }

  

}
