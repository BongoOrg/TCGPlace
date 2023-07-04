export class PictureModel {
	Id!: number
	Name!: string
	Base64!: string

	constructor(Name: string, Base64: string) {
		;(this.Name = Name), (this.Base64 = Base64)
	}
}
