import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SearchPostModel } from '../../models/search-post.model'
import { UserService } from '../UserService/user.service'
import {
	LikedSearchPostModel,
	LikedSearchPostResponseModel
} from '../../models/liked-search-post.model'
import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class LikedSearchPostService {
	constructor(private http: HttpClient, private userService: UserService) {}
	private apiURL = environment.POST_URL
	LikeSearchPost(postId: string): Observable<HttpResponse<any>> {
		type GUID = string & { isGuid: true }
		function guid(guid: string): GUID {
			return guid as GUID
		}

		let guidPostId = guid(postId)
		const userId = this.userService.GetCurrentUserID()

		let likedPost: LikedSearchPostModel = {
			userId: userId,
			searchPostId: guidPostId
		}

		return this.http.post<LikedSearchPostModel>(`${this.apiURL}/LikedSearchPost/add`, likedPost, {
			observe: 'response'
		})
	}

	UnLikeSearchPost(postId: string): Observable<ArrayBuffer> {
		type GUID = string & { isGuid: true }
		function guid(guid: string): GUID {
			return guid as GUID
		}
		let guidPostId = guid(postId)
		const userId = this.userService.GetCurrentUserID()

		let likedPost: LikedSearchPostModel = {
			userId: userId,
			searchPostId: guidPostId
		}
		return this.http.request<ArrayBuffer>('delete', `${this.apiURL}/LikedSearchPost/delete`, {
			body: likedPost
		})
	}

	GetLikedSearchPost(): Observable<LikedSearchPostResponseModel[]> {
		const userID = this.userService.GetCurrentUserID()
		return this.http.get<LikedSearchPostResponseModel[]>(
			`${this.apiURL}/LikedSearchPost/User/${userID}`
		)
	}
}
