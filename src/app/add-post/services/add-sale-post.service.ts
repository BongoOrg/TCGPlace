import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { SalePostModel } from 'src/app/core/models/sale-post.model'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class AddSalePostService {
	constructor(private http: HttpClient) {}

	private apiURL = environment.POST_URL

	PostSalePost(salePost: SalePostModel): Observable<HttpResponse<SalePostModel>> {
		return this.http.post<SalePostModel>(`${this.apiURL}/SalePost/add`, salePost, {
			observe: 'response'
		})
	}
}
