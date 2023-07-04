import { TestBed } from '@angular/core/testing'
import { UserService } from './user.service'

describe('UserService', () => {
	let service: UserService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(UserService)
	})

	afterEach(() => {
		// service = new UserService()
		localStorage.removeItem('todos')
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('return current user id', () => {
		expect(service.GetCurrentUserID()).toEqual(1)
	})
})
