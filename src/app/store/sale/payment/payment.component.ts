import { Component, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { SalePostModel } from '../../../core/models/sale-post.model'
import { PaymentService } from '../../../core/services/PaymentService/payment.service'
import { test } from '@playwright/test'
import { UserService } from '../../../core/services/UserService/user.service'
import { takeUntil } from 'rxjs/operators'
import { UserModel } from '../../../core/models/user.model'
import { of, Subject, switchMap } from 'rxjs'
import { ToastService } from '../../../core/services/toast.service'
import { Router } from '@angular/router'
import { OfferService } from '../services/OfferService/offer.service'
import { Offre } from '../../../messages/models/offre.model'

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
	totalPrice: number = 0
	currentUser!: UserModel | null
	private destroy$ = new Subject<void>()
	deliveryOptions = [
		{
			icon: 'location-outline',
			label: 'Basique',
			price: 0.7
		},
		{
			icon: 'home-outline',
			label: 'Authentifiée',
			price: 4.2
		}
	]
	selectedValue: number = 0
	loading: boolean = false

	post!: SalePostModel
	offer!: Offre
	oldPrice: number = 0
	constructor(
		private router: Router,
		private modalCtrl: ModalController,
		private paymentService: PaymentService,
		private userService: UserService,
		private toastService: ToastService,
		private offerService: OfferService
	) {}

	ngOnInit() {
		if (this.offer !== undefined) {
			this.totalPrice = (Math.round(this.offer.prixPropose * 100) / 100) + 2
			this.oldPrice = this.post.price
		} else {
			this.totalPrice = (Math.round(this.post.price * 100) / 100) + 2
		}
    this.totalPrice = Math.round(this.totalPrice * 100) / 100

		this.userService
			.getCurrentUser()
			.pipe(takeUntil(this.destroy$))
			.subscribe((user) => {
				this.currentUser = user
			})
	}
	onRadioChange(event: any) {

		this.selectedValue = parseFloat(parseFloat(event.detail.value).toFixed(2));
		if (this.offer !== undefined) {
			this.totalPrice = (Math.round(this.offer.prixPropose * 1.07* 100) / 100) + this.selectedValue + 2
		} else {
			this.totalPrice = (Math.round(this.post.price * 1.07* 100) / 100) + this.selectedValue  + 2
    }
    this.totalPrice = Math.round(this.totalPrice * 100) / 100
	}

	async pay() {
		this.loading = true
		const postInfo = {
			shipAddress: this.currentUser?.adress,
			merchPostId: this.post?.id,
			sellerId: this.post?.userId,
			buyerId: this.currentUser?.id,
			totalPrice: this.totalPrice,
			stateId: 'O',
			shipmentFee: this.selectedValue
		}
		this.paymentService
			.Pay(postInfo)
			.pipe(
				switchMap((response) => {
					if (response.status == 200) {
						this.loading = false
						this.toastService.presentToastSuccess('Commande effectuée')
						if (this.offer === undefined) {
							return this.router.navigateByUrl('tabs/home')
						}else{
              return this.offerService.updateOffer(this.offer.id, 'S')
            }

					} else {
						return of(null)
					}
				})
			)
			.subscribe({
				next: async (response) => {
					if (response !== null) {
						await this.modalCtrl.dismiss({ data: 'reload' })
					}
				},
				error: (err) => {
					console.error("Une erreur s'est produite lors de la requête HTTP :", err)
					this.toastService.presentToastError("Erreur lors de la création de l'annonce")
				}
			})
	}

	ngOnDestroy() {
		// déclencher le Subject lors de la destruction du composant
		this.destroy$.next()
		this.destroy$.complete()
	}
	async dismiss() {
		await this.modalCtrl.dismiss()
	}
}
