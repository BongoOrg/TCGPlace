import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { POST_URL } from 'config'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class OfferService {
	private apiURL = POST_URL

	constructor(private httpClient: HttpClient) {}

	createOffer(
		salePostId: string,
		searchPostId: string,
		buyerId: number,
		price: number
	): Observable<HttpResponse<any>> {
		const data = {
			SalePostId: salePostId,
			SearchPostId: searchPostId,
			BuyerId: buyerId,
			Price: price
		}
		return this.httpClient.post(`${this.apiURL}/Offer/add`, data, {
			observe: 'response'
		})
	}

	updateOffer(offerId: number, offerStateId: string): Observable<HttpResponse<any>> {
		const params = { offerId: offerId.toString(), offerStateId: offerStateId }
		return this.httpClient.post(`${this.apiURL}/Offer/update`, null, {
			params,
			observe: 'response'
		})
	}
}
