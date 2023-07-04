import { Injectable } from '@angular/core'
import { AUTH_URL } from '../../../../../config'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class CountryService {
	private apiURL = AUTH_URL

	constructor(private httpClient: HttpClient) {}

	GetAllCountry(): Observable<any> {
		return this.httpClient.get(`${this.apiURL}/Country`)
	}
}
