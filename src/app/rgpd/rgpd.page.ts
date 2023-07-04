import { Component, OnInit } from '@angular/core'
import { Platform } from '@ionic/angular'

@Component({
	selector: 'app-rgpd',
	templateUrl: './rgpd.page.html',
	styleUrls: ['./rgpd.page.scss']
})
export class RgpdPage implements OnInit {
	menuVisible = false
	constructor(public platform: Platform) {}

	ngOnInit() {}

	toggleMenu() {
		this.menuVisible = !this.menuVisible
	}
}
