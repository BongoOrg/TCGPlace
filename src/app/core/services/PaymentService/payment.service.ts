import { Injectable } from '@angular/core'
import { AUTH_URL, INVOICE_URL } from '../../../../../config'
import { Observable, tap } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { SalePostModel } from '../../models/sale-post.model'

@Injectable({
	providedIn: 'root'
})
export class PaymentService {
	private apiURL = INVOICE_URL

	constructor(private httpClient: HttpClient) {}

	Pay(postInfo: any): Observable<HttpResponse<any>> {
		return this.httpClient.post<any>(`${this.apiURL}/Order/add`, postInfo, {
			observe: 'response'
		})
	}
}
