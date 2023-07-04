import { Component, OnInit, ViewChild } from '@angular/core'
import { IonContent, ModalController } from '@ionic/angular'
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	iif,
	map,
	Observable,
	of,
	startWith,
	Subject,
	switchMap,
	takeUntil,
	tap
} from 'rxjs'
import { SearchReferenceComponent } from '../add-post/add-reference-post/search-reference/search-reference.component'
import { PokemonItemReferenceModel } from '../core/models/pokemon-item-reference.model'
import { ActivatedRoute, Router } from '@angular/router'
import { SearchService } from '../core/services/SearchService/search.service'
import { FilterModalComponent } from '../core/components/filter-modal/filter-modal.component'
import { ExtensionModel } from '../home/components/extension-card-slider/models/extension.model'
import { GradingModel } from '../core/models/grading.model'

@Component({
	selector: 'app-store',
	templateUrl: './store.page.html',
	styleUrls: ['./store.page.scss']
})
export class StorePage implements OnInit {
	@ViewChild(IonContent) content!: IonContent
	@ViewChild(SearchReferenceComponent)
	searchComponent!: SearchReferenceComponent

	private unsubscribe$ = new Subject<void>()
	public searchResults$!: Observable<PokemonItemReferenceModel[]>
	public loading: boolean = true

	saleSelected = true
	hideOverlay = true
	selectedReference!: PokemonItemReferenceModel | undefined
	selectedExtensions!: ExtensionModel[] | undefined
	selectedGradings!: GradingModel[] | undefined

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private searchService: SearchService,
		private modalCtrl: ModalController
	) {}

	ngAfterViewInit() {
		this.searchResults$ = this.searchComponent.valueSubject.pipe(
			tap(() => (this.loading = true)),
			takeUntil(this.unsubscribe$), //Unsubscribe onDestroy
			map((value) => (value != '' ? value : '')), //Ne s'execute pas par défaut
			tap((value) => (value === '' ? (this.hideOverlay = true) : (this.hideOverlay = false))), //cache l'overlay si vide
			debounceTime(500), //S'execute après 500ms de non changement
			distinctUntilChanged(), //Ignorer si identique à la valeur précédente
			switchMap((value) => (value !== '' ? this.searchService.SearchReferenceObs(value) : of([]))), //Si value == "" on renvoie un tableau vide
			tap(() => (this.loading = false))
		)
	}

	resetSearch() {
		this.hideOverlay = true
		this.searchComponent.searchValue = ''
	}

	ngOnDestroy() {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	ngOnInit() {
		if (this.route.snapshot.params['id']) {
			let extension: ExtensionModel[] = [
				{
					libelle: '',
					symbole: '',
					id: this.route.snapshot.params['id']
				}
			]
			this.selectedExtensions = extension
		} else {
			if (this.route.snapshot.url[0]) {
				if (this.route.snapshot.url[0].path == 'extension') this.openModal()
			}
		}
	}

	scrollToTop() {
		this.content.scrollToTop(500)
	}

	chooseRef(result: PokemonItemReferenceModel) {
		this.selectedReference = result
		this.resetSearch()
	}

	unSelectRef() {
		this.selectedReference = undefined
	}

	unSelectExtension(extension: ExtensionModel) {
		this.selectedExtensions = this.selectedExtensions?.filter((ex) => ex.id !== extension.id)
	}

	unSelectGrading(grading: GradingModel) {
		this.selectedGradings = this.selectedGradings?.filter((g) => g.id !== grading.id)
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
			if (this.selectedReference != undefined && this.selectedExtensions != undefined) {
				this.selectedReference = undefined
			}
		}
	}
}
