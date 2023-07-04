import { SearchPostModel } from './search-post.model'

type GUID = string & { isGuid: true }
function guid(guid: string): GUID {
	return guid as GUID
}

export class LikedSearchPostModel {
	userId!: number
	searchPostId!: GUID
}

export class LikedSearchPostResponseModel {
	userId!: number
	searchPostId!: GUID
	searchPost!: SearchPostModel
}
