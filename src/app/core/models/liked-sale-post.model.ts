import { SalePostModel } from './sale-post.model'

type GUID = string & { isGuid: true }
function guid(guid: string): GUID {
	return guid as GUID
}

export class LikedSalePostModel {
	userId!: number
	salePostId!: GUID
}

export class LikedSalePostResponseModel {
	userId!: number
	salePostId!: GUID
	salePost!: SalePostModel
}
