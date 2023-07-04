export class ItemModel {
	constructor(
		id: number,
		itemName: string,
		image: string,
		item_extension: string,
		item_number: string
	) {
		this.id = id
		this.itemName = itemName
		this.image = image
		this.item_extension = item_extension
		this.item_number = item_number
	}
	id!: number
	itemName!: string
	image!: string
	item_extension!: string
	item_number!: string
}
