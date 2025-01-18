import { Component, Input, OnInit } from '@angular/core'
import { ExtensionModel } from '../models/extension.model'

@Component({
	selector: 'app-extension-card',
	templateUrl: './extension-card.component.html',
	styleUrls: ['./extension-card.component.scss']
})
export class ExtensionCardComponent implements OnInit {
	@Input() extension!: ExtensionModel
  notFoundImagePath : string = '../../../../assets/img/extensions/not-found.png'
	constructor() {}

	ngOnInit() {

  }
}
