import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CATALOG_URL } from 'config'
import { UserService } from 'src/app/core/services/UserService/user.service'
import { ExtensionModel } from '../models/extension.model'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class ExtensionCardService {
	constructor(private http: HttpClient, private userService: UserService) {}

	private apiURL = CATALOG_URL

	GetAllExtensions(): Observable<ExtensionModel[]> {
		return this.http.get<ExtensionModel[]>(`${this.apiURL}/Pokemon/GetAllPokemonsExtensions`)
	}
}
