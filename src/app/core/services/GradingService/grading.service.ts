import { Injectable } from '@angular/core'
import { POST_URL } from '../../../../../config'
import { Observable } from 'rxjs'
import { GradingModel } from '../../models/grading.model'
import { LikedSalePostResponseModel } from '../../models/liked-sale-post.model'
import { HttpClient } from '@angular/common/http'
import { UserService } from '../UserService/user.service'

@Injectable({
	providedIn: 'root'
})
export class GradingService {
	private apiURL = POST_URL

	constructor(private http: HttpClient) {}

	GetAllGradings(): Observable<GradingModel[]> {
		return this.http.get<GradingModel[]>(`${this.apiURL}/Grading`)
	}
}
