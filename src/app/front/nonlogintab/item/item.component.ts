import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {

  @Input() item
  constructor(private router: Router) { }

  goToDetail(key){
    this.router.navigate(['/detail'],{
      queryParams: {
        postkey: JSON.stringify(key)
      }
      });
  }
}
