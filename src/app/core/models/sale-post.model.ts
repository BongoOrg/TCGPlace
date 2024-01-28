import { MerchPostModel } from './merch-post-model'
import { ItemModel } from './item.model'
import { PictureModel } from './pictures.model'
import { GradingModel } from './grading.model'

type GUID = string & { isGuid: true }
function guid(guid: string): GUID {
	return guid as GUID
}

export class SalePostModel extends MerchPostModel {
	gradingId!: number
	id!: GUID
	itemId!: string
	image!: string
	isPublic!: boolean
  accessCode!: string
	name!: string
	price!: number
	remarks!: string
	userId!: number
	statePostId!: string
	createdAt!: Date
	grading!: GradingModel
	pictures!: PictureModel[]
	salePicturePosts!: string[]
	liked!: boolean
	libelleExtension!: string
	idExtension!: string
	username!: string
}
