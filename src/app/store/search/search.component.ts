import { Component, Input, OnInit } from '@angular/core'
import { ExtensionModel } from '../../home/components/extension-card-slider/models/extension.model'
import { GradingModel } from '../../core/models/grading.model'

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Input() idReference!: string | undefined
	@Input() extensions!: ExtensionModel[] | undefined
	@Input() gradings!: GradingModel[] | undefined
	@Input() idUser!: string | undefined

	constructor() {}

	ngOnInit() {}
}
