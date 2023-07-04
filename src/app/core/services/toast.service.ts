import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ToastController } from '@ionic/angular'

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	constructor(private toastController: ToastController) {}

	public async presentToastSuccess(message: string, duration: number = 2000) {
		const toast = await this.toastController.create({
			message: message,
			duration: duration,
			position: 'top',
			color: 'success',
			icon: 'checkmark-circle'
		})
		await toast.present()
	}

	public async presentToastNotAvailable(duration: number = 2000) {
		const toast = await this.toastController.create({
			message: "Cette fonctionnalité n'est pas encore disponnible",
			duration: duration,
			position: 'middle',
			color: 'warning',
			icon: 'checkmark-circle'
		})
		await toast.present()
	}

	public async presentToastAlreadyExist(message: string, duration: number = 2000) {
		const toast = await this.toastController.create({
			message: message,
			duration: duration,
			position: 'top',
			color: 'danger',
			icon: 'alert-outline'
		})
		await toast.present()
	}

	public async presentToastError(message: string, duration: number = 5000) {
		const toast = await this.toastController.create({
			message: message,
			duration: duration,
			position: 'top',
			color: 'danger',
			icon: 'bug'
		})
		await toast.present()
	}
}
