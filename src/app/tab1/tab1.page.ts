import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  checkkey
  loginstatus
  name

  constructor(private datapass: DatapassService, private router: Router) { }

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
