import { Component, Input, OnInit } from '@angular/core'
import { SearchPostModel } from '../../models/search-post.model'
import { LikedSearchPostService } from '../../services/LikedSearchPostService/liked-search-post.service'
import { Router } from '@angular/router'
import { UserService } from '../../services/UserService/user.service'
@Component({
	selector: 'app-search-post-card',
	templateUrl: './search-post-card.component.html',
	styleUrls: ['./search-post-card.component.scss']
})
export class SearchPostCardComponent implements OnInit{
	@Input() searchPost!: SearchPostModel
	liked!: boolean
  isOwner: boolean = false
	constructor(private likedSearchPostService: LikedSearchPostService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.DefineOwner(this.searchPost.userId)
  }

  DefineOwner(userId: number) {
    let currentUserId = this.userService.GetCurrentUserID()
    if (currentUserId == userId) {
      this.isOwner = true
    } else {
      this.isOwner = false
    }
  }

	LikeSearchPost(searchPostId: string, event: MouseEvent) {
		event.stopPropagation()
		this.searchPost.liked = true
		this.likedSearchPostService.LikeSearchPost(searchPostId).subscribe()
	}

	UnLikeSearchPost(searchPostId: string, event: MouseEvent) {
		event.stopPropagation()
		this.searchPost.liked = false
		this.likedSearchPostService.UnLikeSearchPost(searchPostId).subscribe()
	}

	ViewSearchPost() {
		this.router.navigateByUrl(`/tabs/store/search/view/${this.searchPost.id}`)
	}
}
