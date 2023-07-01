import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RgpdPage } from './rgpd.page';
import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite/politique-de-confidentialite.component';
import { ReglesDuCatalogueComponent } from './regles-du-catalogue/regles-du-catalogue.component';
import { PolitiqueDeCookiesComponent } from './politique-de-cookies/politique-de-cookies.component';
import { TermesEtCGUComponent } from './termes-et-cgu/termes-et-cgu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'politique-de-confidentialite', component: PolitiqueDeConfidentialiteComponent },
      { path: 'regles-du-catalogue', component: ReglesDuCatalogueComponent },
      { path: 'politique-de-cookies', component: PolitiqueDeCookiesComponent },
      { path: 'termes-et-cgu', component: TermesEtCGUComponent }
    ],
    component: RgpdPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RgpdPageRoutingModule {}
