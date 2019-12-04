import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'nonlogintab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../nonlogintab/nonlogintab.module').then(m => m.NonlogintabPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/nonlogintab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/nonlogintab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
