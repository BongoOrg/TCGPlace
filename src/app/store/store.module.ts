import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { StorePageRoutingModule } from './store-routing.module'

import { StorePage } from './store.page'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'
import { SaleComponent } from './sale/sale.component'
import { BrowseSalePostsComponent } from './sale/browse-sale-posts/browse-sale-posts.component'
import { SearchComponent } from './search/search.component'
import { BrowseSearchPostsComponent } from './search/browse-search-posts/browse-search-posts.component'
import { CoreModule } from '../core/core.module'
import { SearchPostCardComponent } from '../core/components/search-post-card/search-post-card.component'
import { SalePostCardComponent } from '../core/components/sale-post-card/sale-post-card.component'
import { AddPostPageModule } from '../add-post/add-post.module'
import { PaymentComponent } from './sale/payment/payment.component'
import { SearchPostService } from './search/services/search-post.service'
import { OfferComponent } from './sale/offer/offer.component'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		StorePageRoutingModule,
		ExploreContainerComponentModule,
		CoreModule,
		AddPostPageModule
	],
	exports: [SalePostCardComponent, SearchPostCardComponent, SaleComponent, SearchComponent],
	declarations: [
		StorePage,
		SaleComponent,
		PaymentComponent,
		BrowseSalePostsComponent,
		SearchComponent,
		BrowseSearchPostsComponent,
		SearchPostCardComponent,
		SalePostCardComponent,
		OfferComponent
	],
	providers: [SearchPostService]
})
export class StorePageModule {}
