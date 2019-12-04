import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonlogintabPageRoutingModule } from './nonlogintab-routing.module';

import { NonlogintabPage } from './nonlogintab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonlogintabPageRoutingModule
  ],
  declarations: [NonlogintabPage]
})
export class NonlogintabPageModule {}
