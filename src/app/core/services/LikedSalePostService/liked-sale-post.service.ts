import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { UserService } from '../UserService/user.service'
import { POST_URL } from '../../../../../config'
import { Observable } from 'rxjs'
import { LikedSalePostModel, LikedSalePostResponseModel } from '../../models/liked-sale-post.model'

@Injectable({
	providedIn: 'root'
})
export class LikedSalePostService {
	constructor(private http: HttpClient, private userService: UserService) {}
	private apiURL = POST_URL

	LikeSalePost(postId: string): Observable<HttpResponse<any>> {
		type GUID = string & { isGuid: true }
		function guid(guid: string): GUID {
			return guid as GUID
		}

		let guidPostId = guid(postId)
		const userId = this.userService.GetCurrentUserID()

		let likedPost: LikedSalePostModel = {
			userId: userId,
			salePostId: guidPostId
		}

		return this.http.post<LikedSalePostModel>(`${this.apiURL}/LikedSalePost/add`, likedPost, {
			observe: 'response'
		})
	}

	UnLikeSalePost(postId: string): Observable<ArrayBuffer> {
		type GUID = string & { isGuid: true }
		function guid(guid: string): GUID {
			return guid as GUID
		}
		let guidPostId = guid(postId)
		const userId = this.userService.GetCurrentUserID()

		let likedPost: LikedSalePostModel = {
			userId: userId,
			salePostId: guidPostId
		}

		return this.http.request<ArrayBuffer>('delete', `${this.apiURL}/LikedSalePost/delete`, {
			body: likedPost
		})
	}

	GetLikedSalePost(): Observable<LikedSalePostResponseModel[]> {
		const userID = this.userService.GetCurrentUserID()
		return this.http.get<LikedSalePostResponseModel[]>(
			`${this.apiURL}/LikedSalePost/User/${userID}`
		)
	}
}
