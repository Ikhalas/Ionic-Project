import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  @Input() item
  numItem = [];
  constructor(private router: Router) { }

  ngOnInit() {}

  goToDetail(key){
    this.router.navigate(['/detail'],{
      queryParams: {
        postkey: JSON.stringify(key)
      }
      });
  }

}
