import { Message } from "./message.model";
import { User } from "./user.model";
import {MerchPostModel} from "../../core/models/merch-post-model";
import {SalePostModel} from "../../core/models/sale-post.model";

export class Conversation {
    public id!: string;
    public messages!: Message[];
    public merchPostId: string = "";
    public merchPost!: SalePostModel;
    public users!: User[];
}
