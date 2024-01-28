import { Component, Renderer2 } from '@angular/core'
import { SearchPostService } from '../services/search-post.service'
import { ActivatedRoute, Router } from '@angular/router'
import { SearchPostModel } from '../../../core/models/search-post.model'
import { BehaviorSubject, filter, map, Observable, of, ReplaySubject, switchMap, take, tap } from 'rxjs'
import { HttpResponse } from '@angular/common/http'
import { UserService } from '../../../core/services/UserService/user.service'
import { Location } from '@angular/common'
import { ActionSheetController, ModalController } from '@ionic/angular'
import { LikedSearchPostService } from '../../../core/services/LikedSearchPostService/liked-search-post.service'
import { FilterModalComponent } from '../../../core/components/filter-modal/filter-modal.component'
import { AddSalePostComponent } from '../../../add-post/add-sale-post/add-sale-post.component'
import { ToastService } from '../../../core/services/toast.service'
import { PrivateInfoModalComponent } from '../../../core/components/private-info-modal/private-info-modal.component'
import { Clipboard } from '@capacitor/clipboard';

@Component({
	selector: 'app-view-search-post',
	templateUrl: './view-search-post.component.html',
	styleUrls: ['./view-search-post.component.scss']
})
export class ViewSearchPostComponent {

	constructor(
		private searchPostService: SearchPostService,
		private route: ActivatedRoute,
		private userService: UserService,
		private router: Router,
		private renderer: Renderer2,
		private location: Location,
		private likedSearchPostService: LikedSearchPostService,
		private actionSheetCtrl: ActionSheetController,
		private modalCtrl: ModalController,
		private toastService: ToastService
	) {}


  loading: boolean = true
  public loadingLike: boolean = false

	isDisabled: boolean = true
	isOwner: boolean = false
	searchPostId: string = this.route.snapshot.params['id']
  accessCode: string = this.route.snapshot.params['accessCode']

	accessToken = localStorage.getItem('access_token')

  SearchPost$: Observable<SearchPostModel | null> = of(new SearchPostModel())
  UserSearchPost$: Observable<SearchPostModel[] | null> = of([])
	private userId$ = new ReplaySubject<number>()
  private accessCode$ = new ReplaySubject<string>()

  // Création d'un BehaviorSubject pour déclencher des mises à jour
  private updateTrigger$ = new BehaviorSubject<void>(undefined);
	ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.accessCode = params['accessCode'] || "";
    });

		this.userId$.pipe(take(1)).subscribe((userId) => {
			this.DefineOwner(userId)
			this.initUserSearchPost$()
		})

    this.accessCode$.pipe(take(1)).subscribe((accessCode) => {
      this.accessCode = accessCode
    })

    // Définir SearchPost$ pour s'abonner à updateTrigger$ et récupérer des données
    this.SearchPost$ = this.updateTrigger$.pipe(
      // Déclencher une nouvelle requête chaque fois que updateTrigger$ émet une valeur
      switchMap(() => this.searchPostService.getSingleSearchPost(this.searchPostId, this.accessCode)),
      filter(value => value !== null),
      tap(_ => (this.loading = false)),
      map(response => response.body),
      tap(resp => {
        this.userId$.next(resp!.userId);
        this.accessCode$.next(resp!.accessCode);
      })
    );

		/*this.SearchPost$ = this.searchPostService
			.getSingleSearchPost(this.route.snapshot.params['id'])
			.pipe(
				filter((value) => value !== null),
				tap((_) => (this.loading = false)),
				map((response) => response.body),
				tap((resp) => this.userId$.next(resp!.userId))
			)*/
	}

	initUserSearchPost$() {
		this.UserSearchPost$ = this.userId$.pipe(
			switchMap((userId) => this.searchPostService.getSomeSearchPostForUser(userId, 5)),
			filter((value) => value !== null),
			tap((_) => (this.loading = false)),
			map((response) => response.body)
		)
	}
	DefineOwner(userId: number) {
		let currentUserId = this.userService.GetCurrentUserID()
		if (currentUserId == userId) {
			this.isOwner = true
		} else {
			this.isOwner = false
		}
	}

	ngOnDestroy() {
		this.userId$.complete()
	}

	redirectToPaymentModule() {
		this.router.navigateByUrl(`/payment`)
	}

  async switchToPublic(){
    this.switchIsPublic().subscribe(() => {
      this.updateTrigger$.next();
      this.toastService.presentToastSuccess("Votre annonce est maintenant publique",2000, 'bottom')
    })
  }

  async switchToPrivate() {
    this.switchIsPublic().subscribe(r => {
      this.openModal(r)
      this.updateTrigger$.next();
      this.toastService.presentToastSuccess("Votre annonce est maintenant privée",2000, 'bottom')
    });
  }

	switchIsPublic(): Observable<string> {
    if (this.accessToken !== null) {
      return this.searchPostService
        .switchIsPublic(this.route.snapshot.params['id'], this.accessToken);
    } else {
      return of(null as any);
    }
	}

  async openModal(accessCode:string) {
    const modalSearch = await this.modalCtrl.create({
      component: PrivateInfoModalComponent,
      componentProps: {
        isReference: true,
        salePostId: this.searchPostId,
        postType: "search",
        accessCode: accessCode
      }
    })
    await modalSearch.present()
  }

	async deleteSearchPost(id: string) {
		const confirm = await this.canDismiss()
		if (confirm) {
			this.searchPostService.deleteSearchPost(id).subscribe(() => {
				this.location.back()
			})
		}
	}

	LikeSearchPost(id: string, event: MouseEvent) {
		this.loadingLike = true
		event.stopPropagation()
		this.likedSearchPostService
			.LikeSearchPost(id)
			.pipe(
				switchMap((_) =>
					this.searchPostService.getSingleSearchPost(this.route.snapshot.params['id'])
				),
				filter((value) => value !== null),
				tap((_) => (this.loadingLike = false)),
				map((response) => response.body),
				tap((resp) => this.userId$.next(resp!.userId))
			)
			.subscribe((searchPost) => (this.SearchPost$ = of(searchPost)))
	}

	UnlikeSearchPost(id: string, event: MouseEvent) {
		this.loadingLike = true
		event.stopPropagation()
		this.likedSearchPostService
			.UnLikeSearchPost(id)
			.pipe(
				switchMap((_) =>
					this.searchPostService.getSingleSearchPost(this.route.snapshot.params['id'])
				),
				filter((value) => value !== null),
				tap((_) => (this.loadingLike = false)),
				map((response) => response.body),
				tap((resp) => this.userId$.next(resp!.userId))
			)
			.subscribe((searchPost) => (this.SearchPost$ = of(searchPost)))
	}

	async dismiss() {
		await this.modalCtrl.dismiss()
	}

	canDismiss = async () => {
		const actionSheet = await this.actionSheetCtrl.create({
			mode: 'ios',
			header: 'Êtes vous sûr ?',
			buttons: [
				{
					text: 'Oui',
					role: 'confirm'
				},
				{
					text: 'Non',
					role: 'cancel'
				}
			]
		})

		await actionSheet.present()

		const { role } = await actionSheet.onWillDismiss()

		return role === 'confirm'
	}

	async OpenAddSalePost(searchPost: SearchPostModel) {
		const modalSale = await this.modalCtrl.create({
			component: AddSalePostComponent,
			componentProps: {
				idBuyer: searchPost.userId,
				searchPost: searchPost
			}
		})
		await modalSale.present()
		const { data, role } = await modalSale.onDidDismiss()
	}

	notAvailable() {
		this.toastService.presentToastNotAvailable()
	}

  async CopyToClipboard() {
    let text = "http://localhost:8100/tabs/store/search/view/" + this.searchPostId;
    if(this.accessCode != ""){
      text += "?accessCode=" + this.accessCode
    }
    await this.toastService.presentInfoToast("Lien copié dans le presse-papier", 2000)
    await Clipboard.write({
      string: text
    });
  }
}
