import { Component, isDevMode, OnInit } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
import { register } from 'swiper/element/bundle'
import { environment } from '../environments/environment';

register()
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
	constructor() {
		registerLocaleData(localeFr)
	}

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
