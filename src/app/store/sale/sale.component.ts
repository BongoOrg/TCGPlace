import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ExtensionModel } from '../../home/components/extension-card-slider/models/extension.model'
import { GradingModel } from '../../core/models/grading.model'

@Component({
	selector: 'app-sale',
	templateUrl: './sale.component.html',
	styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
	@Input() idReference: string | undefined
	@Input() extensions: ExtensionModel[] | undefined
	@Input() gradings: GradingModel[] | undefined
	@Input() idUser: string | undefined
	constructor(private router: Router) {}
	routeUrl: string = this.router.url

	ngOnInit() {}
}
