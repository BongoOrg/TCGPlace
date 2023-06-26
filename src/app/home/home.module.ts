import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {HomeBannerComponent} from "./components/home-banner-slider/home-banner/home-banner.component";
import {HomeBannerSliderComponent} from "./components/home-banner-slider/home-banner-slider.component";
import {ExtensionCardComponent} from "./components/extension-card-slider/extension-card/extension-card.component";
import {ExtensionCardSliderComponent} from "./components/extension-card-slider/extension-card-slider.component";
import {LastestSalePostSliderComponent} from "./components/lastest-sale-post-slider/lastest-sale-post-slider.component";
import {StorePageModule} from "../store/store.module";
import {CoreModule} from "../core/core.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        StorePageModule,
        CoreModule
    ],
  declarations: [HomePage, HomeBannerComponent, HomeBannerSliderComponent, ExtensionCardComponent, ExtensionCardSliderComponent, LastestSalePostSliderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class HomePageModule {}
