import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-home-banner-slider',
	templateUrl: './home-banner-slider.component.html',
	styleUrls: ['./home-banner-slider.component.scss']
})
export class HomeBannerSliderComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	goToEvent = (eventId: number): void => {}

	goToExtension = (extensionId: number): void => {}
}
