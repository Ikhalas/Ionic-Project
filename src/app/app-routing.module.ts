import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./front/home/home.module').then( m => m.HomePageModule)
  },
  /*{
    path: '',
    loadChildren: () => import('./maintabs/maintabs.module').then( m => m.MaintabsPageModule)
  },*/
  {
    path: 'home',
    loadChildren: () => import('./front/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'maintabs',
    loadChildren: () => import('./maintabs/maintabs.module').then( m => m.MaintabsPageModule)
  },

  {
    path: 'tags',
    loadChildren: () => import('./tags/tags.module').then( m => m.TagsPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'upload-avatar',
    loadChildren: () => import('./upload-avatar/upload-avatar.module').then( m => m.UploadAvatarPageModule)
  },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
