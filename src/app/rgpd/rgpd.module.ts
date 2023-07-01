import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RgpdPageRoutingModule } from './rgpd-routing.module';

import { RgpdPage } from './rgpd.page';
import { RouterModule } from '@angular/router';
import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite/politique-de-confidentialite.component';
import { ReglesDuCatalogueComponent } from './regles-du-catalogue/regles-du-catalogue.component';
import { PolitiqueDeCookiesComponent } from './politique-de-cookies/politique-de-cookies.component';
import { TermesEtCGUComponent } from './termes-et-cgu/termes-et-cgu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RgpdPageRoutingModule
  ],
  exports: [
    PolitiqueDeConfidentialiteComponent,
    ReglesDuCatalogueComponent,
    PolitiqueDeCookiesComponent,
    TermesEtCGUComponent
  ],
  declarations: [
    RgpdPage,
    PolitiqueDeConfidentialiteComponent,
    ReglesDuCatalogueComponent,
    PolitiqueDeCookiesComponent,
    TermesEtCGUComponent]
})
export class RgpdPageModule {}
