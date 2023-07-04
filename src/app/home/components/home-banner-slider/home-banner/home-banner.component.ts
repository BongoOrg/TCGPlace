import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-home-banner',
	templateUrl: './home-banner.component.html',
	styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
	@Input() title!: string
	@Input() description!: string
	@Input() btnUrlRedirect!: string

	constructor(private router: Router) {}

	ngOnInit() {}

	redirectTo(btnUrlRedirect: string) {
		this.router.navigateByUrl(btnUrlRedirect)
	}
}
