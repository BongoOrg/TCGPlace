import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { UserModel } from '../../../core/models/user.model'
import { UserService } from '../../../core/services/UserService/user.service'
import { SalePostModel } from '../../../core/models/sale-post.model'
import { SearchPostModel } from '../../../core/models/search-post.model'
import { SalePostService } from '../../../store/sale/services/sale-post.service'
import { SearchPostService } from '../../../store/search/services/search-post.service'
import { HttpResponse } from '@angular/common/http'
import { PokemonItemReferenceModel } from '../../../core/models/pokemon-item-reference.model'
import { GradingModel } from '../../../core/models/grading.model'
import { ExtensionModel } from '../../../home/components/extension-card-slider/models/extension.model'
import { FilterModalComponent } from '../../../core/components/filter-modal/filter-modal.component'
import { ModalController } from '@ionic/angular'

@Component({
	selector: 'app-view-profile',
	templateUrl: './view-profile.component.html',
	styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
	idProfile!: string
	UserInfos$!: Observable<UserModel>
	saleSelected: boolean = true

	SalePosts$!: Observable<HttpResponse<SalePostModel[]>>
	SearchPosts$!: Observable<HttpResponse<SearchPostModel[]>>
	selectedGradings!: GradingModel[]
	selectedExtensions!: ExtensionModel[]

	constructor(
		private route: ActivatedRoute,
		private userService: UserService,
		private salePostService: SalePostService,
		private searchPostService: SearchPostService,
		private modalCtrl: ModalController
	) {}

	ngOnInit() {
		this.idProfile = this.route.snapshot.params['id']
		this.UserInfos$ = this.userService.GetProfileInfos(this.idProfile)
		this.SalePosts$ = this.salePostService.getPublicSalePosts()
		this.SearchPosts$ = this.searchPostService.getPublicSearchPosts()
	}

	async openModal() {
		const modalSale = await this.modalCtrl.create({
			component: FilterModalComponent
		})
		await modalSale.present()
		const { data, role } = await modalSale.onDidDismiss()

		if (role === 'confirm') {
			this.selectedExtensions = data['extensions']
			this.selectedGradings = data['gradings']
		}
	}

	unSelectExtension(extension: ExtensionModel) {
		this.selectedExtensions = this.selectedExtensions?.filter((ex) => ex.id !== extension.id)
	}

	unSelectGrading(grading: GradingModel) {
		this.selectedGradings = this.selectedGradings?.filter((g) => g.id !== grading.id)
	}
}
