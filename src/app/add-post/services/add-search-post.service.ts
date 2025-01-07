import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SearchPostModel } from '../../core/models/search-post.model'
import { environment } from '../../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class AddSearchPostService {
	constructor(private http: HttpClient) {}

	private apiURL = environment.POST_URL

	PostSearchPost(searchPost: SearchPostModel): Observable<HttpResponse<SearchPostModel>> {
		return this.http.post<SearchPostModel>(`${this.apiURL}/SearchPost/add`, searchPost, {
			observe: 'response'
		})
	}
}
