import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PokemonItemReferenceModel } from '../../models/pokemon-item-reference.model'
import { environment } from '../../../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class PokemonService {
	constructor(private http: HttpClient) {}

	private apiURL = environment.CATALOG_URL

	GetAllReference(): Observable<PokemonItemReferenceModel[]> {
		return this.http.get<PokemonItemReferenceModel[]>(`${this.apiURL}/Items`)
	}

	GetReferenceById(id: string): Observable<PokemonItemReferenceModel> {
		return this.http.get<PokemonItemReferenceModel>(`${this.apiURL}/Items/${id}`)
	}
}
