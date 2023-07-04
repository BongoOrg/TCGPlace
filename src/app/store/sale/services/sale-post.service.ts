import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http'
import { POST_URL } from '../../../../../config'
import { Observable } from 'rxjs'
import { SalePostModel } from '../../../core/models/sale-post.model'
import { ExtensionModel } from '../../../home/components/extension-card-slider/models/extension.model'
import { GradingModel } from '../../../core/models/grading.model'

@Injectable({
	providedIn: 'root'
})
export class SalePostService {
	constructor(private http: HttpClient) {}
	private apiURL = POST_URL

	getPublicSalePosts(
		idReference: string | undefined = 'null',
		extensions: ExtensionModel[] | undefined = undefined,
		gradings: GradingModel[] | undefined = undefined,
		idUser: string | undefined = undefined,
		pageNumber: number = 1,
		pageSize: number = 10
	): Observable<HttpResponse<SalePostModel[]>> {
		let params = new HttpParams()
		params = params.append('pageNumber', pageNumber)
		params = params.append('pageSize', pageSize)

		let idExtensions = extensions?.map((extension) => extension.id)
		let stringExtensions = idExtensions?.toString()
		stringExtensions == '' ? (stringExtensions = undefined) : stringExtensions

		let idGradings = gradings?.map((grading) => grading.id)
		let stringGradings = idGradings?.toString()
		stringGradings == '' ? (stringGradings = undefined) : stringGradings

		return this.http.get<SalePostModel[]>(
			`${this.apiURL}/SalePost/public?idReference=${idReference}&idExtensions=${stringExtensions}&idGradings=${stringGradings}&idUser=${idUser}`,
			{ params: params, observe: 'response' }
		)
	}

	getSingleSalePost(id: any): Observable<HttpResponse<SalePostModel>> {
		return this.http.get<SalePostModel>(`${this.apiURL}/SalePost/${id}`, {
			observe: 'response'
		})
	}

	getSomeSalePostForUser(
		userId: number,
		pageSize: number
	): Observable<HttpResponse<SalePostModel[]>> {
		return this.http.get<SalePostModel[]>(`${this.apiURL}/SalePost/user/${userId}/${pageSize}`, {
			observe: 'response'
		})
	}

	switchIsPublic(salePostId: any, token: string): Observable<HttpResponse<any>> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		})
		return this.http.put<any>(`${this.apiURL}/SalePost/public/${salePostId}`, {
			headers,
			observe: 'response'
		})
	}

	deleteSalePost(salePostId: string): Observable<HttpResponse<any>> {
		return this.http.delete<any>(`${this.apiURL}/SalePost/${salePostId}`, {
			observe: 'response'
		})
	}
}
