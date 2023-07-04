import { Component, OnInit } from '@angular/core'
import { SearchPostModel } from '../../../core/models/search-post.model'
import { SalePostModel } from '../../../core/models/sale-post.model'
import { ItemModel } from '../../../core/models/item.model'
import { Router } from '@angular/router'
import { filter, map, Observable, of, tap } from 'rxjs'
import { SalePostService } from '../../../store/sale/services/sale-post.service'

@Component({
	selector: 'app-lastest-sale-post-slider',
	templateUrl: './lastest-sale-post-slider.component.html',
	styleUrls: ['./lastest-sale-post-slider.component.scss']
})
export class LastestSalePostSliderComponent implements OnInit {
	isLoading: boolean = true

	salePost: Observable<SalePostModel[] | null> = of([])
	constructor(private router: Router, private saleService: SalePostService) {}

	ngOnInit() {
		this.salePost = this.saleService.getPublicSalePosts().pipe(
			filter((value) => value !== null),
			tap((val) => (this.isLoading = false)),
			map((response) => response.body)
		)
		this.salePost.subscribe((data) => {})
	}

	navigateTo() {
		this.router.navigateByUrl('/tabs/store')
	}
}
