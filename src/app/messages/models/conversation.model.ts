import { Message } from "./message.model";
import { User } from "./user.model";

export class Conversation {
    public id!: string;
    public messages!: Message[];
    public merchPostId: string = "";
    public users!: User[];
}