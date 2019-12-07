import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../config/firebaseconfig';

@Component({
  selector: 'app-nonlogintab',
  templateUrl: './nonlogintab.page.html',
  styleUrls: ['./nonlogintab.page.scss'],
})
export class NonlogintabPage   {

  items = [];

  constructor() {
    firebase.database().ref('posts/').on('value', res => {
      this.items = snapshotToArray(res).map((item) => {
        return item
      })
    })
  }

}
