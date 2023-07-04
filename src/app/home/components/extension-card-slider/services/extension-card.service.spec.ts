import { TestBed } from '@angular/core/testing'

import { ExtensionCardService } from './extension-card.service'

describe('ExtensionCardService', () => {
	let service: ExtensionCardService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(ExtensionCardService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
