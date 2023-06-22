import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpErrorInterceptor} from "./core/interceptors/http-error.interceptor";
import {CoreModule} from "./core/core.module";
import { LikesComponent } from './profile/components/likes/likes.component';
import {StorePageModule} from "./store/store.module";
import { ViewSearchPostComponent } from './store/search/view-search-post/view-search-post.component';
import { ViewSalePostComponent } from './store/sale/view-sale-post/view-sale-post.component';
import { FilterModalComponent } from './core/components/filter-modal/filter-modal.component';
import {ViewProfileComponent} from "./profile/components/view-profile/view-profile.component";
import {TransactionsComponent} from "./profile/components/transactions/transactions.component";
import {
    BuyedTransactionsComponent
} from "./profile/components/transactions/buyed-transactions/buyed-transactions.component";

@NgModule({
    declarations: [
        AppComponent,
        LikesComponent,
        ViewSearchPostComponent,
        ViewSalePostComponent,
        FilterModalComponent,
        ViewProfileComponent,
        TransactionsComponent,
        BuyedTransactionsComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        StorePageModule
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
        {provide: LOCALE_ID, useValue: 'fr'}],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
