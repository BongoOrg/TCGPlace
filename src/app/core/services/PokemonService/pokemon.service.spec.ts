import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PokemonService } from './pokemon.service'
import { CATALOG_URL } from '../../../../../config'

describe('PokemonService', () => {
	let service: PokemonService
	let httpMock: HttpTestingController

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [PokemonService]
		})
		service = TestBed.inject(PokemonService)
		httpMock = TestBed.inject(HttpTestingController)
	})

	afterEach(() => {
		httpMock.verify() // On vérifie qu'il n'y a pas eu de requêtes en attente
	})

	it('should get all references', () => {
		service.GetAllReference().subscribe((data) => {
			expect(data).toBeTruthy() // On vérifie que la réponse est bien égale à mockData
		})
		const req = httpMock.expectOne(`${CATALOG_URL}/api/Pokemon`)
		expect(req.request.method).toBe('GET')
	})

	it('should get a reference by id', () => {
		service.GetReferenceById('base1-1').subscribe((data) => {
			expect(data).toBeTruthy() // On vérifie que la réponse est bien égale à mockData
		})
		const req = httpMock.expectOne(`${CATALOG_URL}/api/Pokemon/base1-1`)
		expect(req.request.method).toBe('GET')
	})
})
