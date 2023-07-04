import { Component } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
	selector: 'app-full-screen-image-slider',
	templateUrl: './full-screen-image-slider.component.html',
	styleUrls: ['./full-screen-image-slider.component.scss']
})
export class FullScreenImageSliderComponent {
	imageReference!: string
	images: string[] = []

	constructor(private modalCtrl: ModalController) {}

	async dismiss() {
		await this.modalCtrl.dismiss()
	}
}
