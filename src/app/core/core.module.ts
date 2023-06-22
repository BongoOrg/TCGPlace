import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkeletonGridComponent} from "./components/skeleton-grid/skeleton-grid.component";
import {IonicModule} from "@ionic/angular";
import { FullScreenImageComponent } from './components/full-screen-image/full-screen-image.component';
import { FullScreenImageSliderComponent } from './components/full-screen-image-slider/full-screen-image-slider.component';
import {LoadingPageComponent} from "./components/loading-page/loading-page.component";



@NgModule({
  declarations: [SkeletonGridComponent, FullScreenImageComponent, FullScreenImageSliderComponent, LoadingPageComponent],
  exports: [
    SkeletonGridComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { }
