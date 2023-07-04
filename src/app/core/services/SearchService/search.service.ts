import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CATALOG_URL, POST_URL } from '../../../../../config'
import { ItemSearchResponseModel } from '../../models/item-search-response.model'
import { PokemonItemReferenceModel } from '../../models/pokemon-item-reference.model'
import { ExtensionModel } from '../../../home/components/extension-card-slider/models/extension.model'

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	constructor(private http: HttpClient) {}

	private apiURL = CATALOG_URL
	SearchReference(
		query: string,
		extensions: ExtensionModel[] | undefined = undefined,
		pageNumber: number = 1,
		pageSize: number = 10
	): Observable<HttpResponse<PokemonItemReferenceModel[]>> {
		let params = new HttpParams()
		params = params.append('pageNumber', pageNumber)
		params = params.append('pageSize', pageSize)

		let idExtensions = extensions?.map((extension) => extension.id)
		let stringExtensions = idExtensions?.toString()
		stringExtensions == '' ? (stringExtensions = undefined) : stringExtensions
		return this.http.get<PokemonItemReferenceModel[]>(
			`${this.apiURL}/Search?query=${query}&extensions=${stringExtensions}`,
			{ params: params, observe: 'response' }
		)
	}

	SearchReferenceObs(
		query: string,
		extensions: ExtensionModel[] | undefined = undefined
	): Observable<PokemonItemReferenceModel[]> {
		let idExtensions = extensions?.map((extension) => extension.id)
		let stringExtensions = idExtensions?.toString()
		stringExtensions == '' ? (stringExtensions = undefined) : stringExtensions
		return this.http.get<PokemonItemReferenceModel[]>(
			`${this.apiURL}/Search?query=${query}&extensions=${stringExtensions}`
		)
	}
}
