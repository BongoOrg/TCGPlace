import { Component, Input, OnInit } from '@angular/core'
import { SalePostModel } from '../../models/sale-post.model'
import { LikedSalePostService } from '../../services/LikedSalePostService/liked-sale-post.service'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { ReplaySubject } from 'rxjs'
import { UserService } from '../../services/UserService/user.service'

@Component({
	selector: 'app-sale-post-card',
	templateUrl: './sale-post-card.component.html',
	styleUrls: ['./sale-post-card.component.scss']
})
export class SalePostCardComponent implements OnInit {
	@Input() salePost!: SalePostModel
  isOwner: boolean = false

	constructor(private likedSalePostService: LikedSalePostService,
              private userService: UserService,
              private router: Router) {}

	ngOnInit() {
    this.DefineOwner(this.salePost.userId)
  }

  DefineOwner(userId: number) {
    let currentUserId = this.userService.GetCurrentUserID()
    if (currentUserId == userId) {
      this.isOwner = true
    } else {
      this.isOwner = false
    }
  }
	LikeSalePost(salePostId: string, event: MouseEvent) {
		event.stopPropagation()
		this.salePost.liked = true
		this.likedSalePostService.LikeSalePost(salePostId).subscribe()
	}

	UnLikeSalePost(salePostId: string, event: MouseEvent) {
		event.stopPropagation()
		this.salePost.liked = false
		this.likedSalePostService.UnLikeSalePost(salePostId).subscribe()
	}

	redirectToAddPost(sale_post_id: string) {
		this.router.navigateByUrl(`/tabs/store/sale/view/${sale_post_id}`)
	}
}
