import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSalePostComponent } from './sale/view-sale-post/view-sale-post.component';

import { StorePage } from './store.page';
import {ViewSearchPostComponent} from "./search/view-search-post/view-search-post.component";
import { OfferComponent } from './sale/offer/offer.component';

const routes: Routes = [
  {
    path: '',
    component: StorePage
  },
  {
    path: 'sale/offer/:id',
    component: OfferComponent
  },
  {
    path: 'sale/view/:id',
    component: ViewSalePostComponent
  },
  {
    path: 'extension/:id',
    component: StorePage
  },
  {
    path: 'extension/',
    component: StorePage
  },
  {
    path: 'search/:id',
    component: ViewSearchPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule {}
