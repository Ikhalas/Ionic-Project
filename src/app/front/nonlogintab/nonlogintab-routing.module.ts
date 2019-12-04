import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonlogintabPage } from './nonlogintab.page';

const routes: Routes = [
  {
    path: '',
    component: NonlogintabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonlogintabPageRoutingModule {}
