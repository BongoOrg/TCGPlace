import { Component } from '@angular/core'
import { LikedSearchPostService } from '../../../core/services/LikedSearchPostService/liked-search-post.service'
import { LikedSearchPostResponseModel } from '../../../core/models/liked-search-post.model'
import { Observable } from 'rxjs'
import { LikedSalePostService } from '../../../core/services/LikedSalePostService/liked-sale-post.service'
import { LikedSalePostResponseModel } from '../../../core/models/liked-sale-post.model'

@Component({
	selector: 'app-likes',
	templateUrl: './likes.component.html',
	styleUrls: ['./likes.component.scss']
})
export class LikesComponent {
	constructor(
		private likedSearchPostService: LikedSearchPostService,
		private likedSalePostService: LikedSalePostService
	) {}

	likedSearchPosts$!: Observable<LikedSearchPostResponseModel[]>
	likedSalePosts$!: Observable<LikedSalePostResponseModel[]>
	loading: boolean = true
	saleSelected: boolean = true
	ngOnInit() {
		this.likedSearchPosts$ = this.likedSearchPostService.GetLikedSearchPost()
		this.likedSalePosts$ = this.likedSalePostService.GetLikedSalePost()
	}
}
