import { Component, OnInit } from '@angular/core'
import { PokemonService } from '../../core/services/PokemonService/pokemon.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { PokemonItemReferenceModel } from '../../core/models/pokemon-item-reference.model'
import { SearchPostModel } from '../../core/models/search-post.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AddSearchPostService } from '../services/add-search-post.service'
import { UserService } from '../../core/services/UserService/user.service'
import { ToastService } from '../../core/services/toast.service'
import { ModalController } from '@ionic/angular'
import { FullScreenImageComponent } from 'src/app/core/components/full-screen-image/full-screen-image.component'
import { PhotoService } from '../../core/services/photo.service'

@Component({
	selector: 'app-add-search-post',
	templateUrl: './add-search-post.component.html',
	styleUrls: ['./add-search-post.component.scss']
})
export class AddSearchPostComponent implements OnInit {
	constructor(
		public formBuilder: FormBuilder,
		private pokemonService: PokemonService,
		private route: ActivatedRoute,
		private addSearchPostService: AddSearchPostService,
		private userService: UserService,
		private router: Router,
		private toastService: ToastService,
		private modalCtrl: ModalController
	) {}

	reference$!: Observable<PokemonItemReferenceModel>
	ionicForm!: FormGroup
	loading: boolean = false

	ngOnInit() {
		this.reference$ = this.pokemonService.GetReferenceById(this.route.snapshot.params['id'])
		this.buildIonicForm()
	}

	buildIonicForm() {
		this.ionicForm = this.formBuilder.group({
			price: ['', [Validators.required, Validators.min(0.5)]],
			grading: ['', [Validators.required]],
			remarks: [''],
			public: [true],
			refId: this.route.snapshot.params['id']
		})
	}

	submitForm() {
		this.loading = true
		let searchPost: SearchPostModel = this.getFormData()

		this.addSearchPostService.PostSearchPost(searchPost).subscribe({
			next: (response) => {
				if (response.status == 201) {
					this.toastService.presentToastSuccess('Annonce crée')
					this.loading = false
					this.router.navigateByUrl('/tabs/add')
				}
			}
		})
	}

	getFormData(): SearchPostModel {
		let searchPost: SearchPostModel = new SearchPostModel()
		searchPost.itemId = this.ionicForm.controls['refId'].value
		searchPost.price = this.ionicForm.controls['price'].value
		searchPost.remarks = this.ionicForm.controls['remarks'].value
		searchPost.isPublic = this.ionicForm.controls['public'].value
		searchPost.statePostId = 'C'
		searchPost.gradingId = this.ionicForm.controls['grading'].value
		searchPost.userId = this.userService.GetCurrentUserID()

		return searchPost
	}

	async openFullscreenImage(imageUrl: string) {
		const modal = await this.modalCtrl.create({
			component: FullScreenImageComponent,
			componentProps: {
				imageUrl: imageUrl
			}
		})
		return await modal.present()
	}
}
