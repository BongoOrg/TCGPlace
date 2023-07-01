import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RgpdPageRoutingModule } from './rgpd-routing.module';

import { RgpdPage } from './rgpd.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RgpdPageRoutingModule
  ],
  declarations: [RgpdPage]
})
export class RgpdPageModule {}
