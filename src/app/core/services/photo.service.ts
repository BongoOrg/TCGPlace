import { getLocaleDateFormat } from '@angular/common'
import { Injectable } from '@angular/core'
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'
import { read } from 'fs'
import { PictureModel } from 'src/app/core/models/pictures.model'

@Injectable({
	providedIn: 'root'
})
export class PhotoService {
	public photos: UserPhoto[] = []
	private PHOTO_STORAGE: string = 'photos'
	constructor() {}

	public async addNewToGallery() {
		// Take a photo
		const capturedPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Uri, // file-based data; provides best performance
			source: CameraSource.Camera, // automatically take a new photo with the camera
			quality: 100, // highest quality (0 to 100)
			width: 500,
			height: 1000
		})

		// Save the picture and add it to photo collection
		const savedImageFile = await this.savePicture(capturedPhoto)
		this.photos.push(<UserPhoto>savedImageFile)
		await Preferences.set({
			key: this.PHOTO_STORAGE,
			value: JSON.stringify(this.photos)
		})
	}

	public async loadSaved() {
		// Retrieve cached photo array data
		const photoList = await Preferences.get({ key: this.PHOTO_STORAGE })
		if (typeof photoList.value === 'string') {
			this.photos = JSON.parse(photoList.value) || []
		}
		// Display the photo by reading into base64 format
		for (let photo of this.photos) {
			// Read each saved photo's data from the Filesystem
			const readFile = await Filesystem.readFile({
				path: photo.filepath,
				directory: Directory.Data
			})

			// Web platform only: Load the photo as base64 data
			photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`
		}
		// more to come...
	}

	private async savePicture(photo: Photo) {
		// Convert photo to base64 format, required by Filesystem API to save
		const base64Data = await this.readAsBase64(photo)
		// Write the file to the data directory
		const fileName = new Date().getTime() + '.jpeg'
		const savedFile = await Filesystem.writeFile({
			path: fileName,
			data: base64Data,
			directory: Directory.Data
		})

		// // Use webPath to display the new image instead of base64 since it's
		// // already loaded into memory
		return {
			filepath: fileName,
			webviewPath: photo.webPath
		}
	}

	private async readAsBase64(photo: Photo) {
		// Fetch the photo, read as a blob, then convert to base64 format
		const response = await fetch(photo.webPath!)
		const blob = await response.blob()

		return (await this.convertBlobToBase64(blob)) as string
	}

	private convertBlobToBase64 = (blob: Blob) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onerror = reject
			reader.onload = () => {
				resolve(reader.result)
			}
			reader.readAsDataURL(blob)
		})

	async deletePhoto(photo: UserPhoto) {
		try {
			// Supprime la photo du système de fichiers
			await Filesystem.deleteFile({
				path: photo.filepath,
				directory: Directory.Data
			})

			// Supprime la photo de la collection
			const index = this.photos.findIndex((p) => p.filepath === photo.filepath)
			if (index !== -1) {
				this.photos.splice(index, 1)
			}

			// Met à jour les préférences de stockage avec la nouvelle collection
			await Preferences.set({
				key: this.PHOTO_STORAGE,
				value: JSON.stringify(this.photos)
			})
		} catch (error) {
			console.error("Une erreur s'est produite lors de la suppression de la photo :", error)
		}
	}

	public async CreatePicture(): Promise<PictureModel[]> {
		var pictures: PictureModel[] = []

		//Récupération des photos sauvegardées
		const photoList = await Preferences.get({ key: this.PHOTO_STORAGE })
		if (typeof photoList.value === 'string') {
			this.photos = JSON.parse(photoList.value) || []
		}
		//Insertion de chaque photo dans le tableau
		for (let photo of this.photos) {
			const readFile = await Filesystem.readFile({
				path: photo.filepath,
				directory: Directory.Data
			})

			const base64 = readFile.data

			const min = Math.ceil(0)
			const max = Math.floor(99999)
			const rdm = Math.floor(Math.random() * (max - min)) + min
			const maDate: string = new Date().toISOString().substring(0, 10)
			const nomFic = rdm + '_' + maDate

			const pic = new PictureModel(nomFic, base64)

			pictures.push(pic)
		}
		return pictures
	}
}

export interface UserPhoto {
	filepath: string
	webviewPath: string
}
