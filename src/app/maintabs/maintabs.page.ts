import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-maintabs',
  templateUrl: './maintabs.page.html',
  styleUrls: ['./maintabs.page.scss'],
})
export class MaintabsPage implements OnInit {


  constructor(private nav: NavController) { }

  ngOnInit() {
  }

}
