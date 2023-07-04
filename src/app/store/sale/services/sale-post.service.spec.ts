import { TestBed } from '@angular/core/testing'

import { SalePostService } from './sale-post.service'

describe('SalePostService', () => {
	let service: SalePostService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(SalePostService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
