import { MerchPostModel } from './merch-post-model'
import { ItemModel } from './item.model'
import { GradingModel } from './grading.model'

type GUID = string & { isGuid: true }
function guid(guid: string): GUID {
	return guid as GUID
}

export class SearchPostModel extends MerchPostModel {
	id!: GUID
	gradingId!: number
	price!: number
	remarks!: string
	isPublic!: boolean
  accessCode!: string
	statePostId!: string
	userId!: number
	name!: string
	image!: string
	itemId!: number
	itemExtension!: string
	itemNumber!: string
	itemName!: string
  createdAt!: Date
	grading!: GradingModel
	username!: string
	liked!: boolean
}
