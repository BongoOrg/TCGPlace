import { Injectable } from '@angular/core'
import { LoadingController } from '@ionic/angular'

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	loading?: HTMLIonLoadingElement

	constructor(public loadingController: LoadingController) {}

	async show() {
		this.loading = await this.loadingController.create({
			message: 'Please wait...',
			spinner: 'crescent', // Changer le type de spinner selon vos besoins.
			duration: 2000
		})
		await this.loading.present()
	}

	async hide() {
		if (this.loading != null) {
			await this.loading.dismiss()
		}
	}
}
