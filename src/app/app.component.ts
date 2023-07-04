import { Component } from '@angular/core'
import { registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr'
import { register } from 'swiper/element/bundle'

register()
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	constructor() {
		registerLocaleData(localeFr)
	}
}
