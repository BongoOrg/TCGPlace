import { Component } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
	selector: 'app-full-screen-image',
	templateUrl: './full-screen-image.component.html',
	styleUrls: ['./full-screen-image.component.scss']
})
export class FullScreenImageComponent {
	imageUrl!: string

	constructor(private modalCtrl: ModalController) {}

	async dismiss() {
		await this.modalCtrl.dismiss()
	}
}
