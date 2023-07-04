import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { MESSAGERIE_URL } from 'config'
import { Conversation } from '../models/conversation.model'
import { Subject } from '@microsoft/signalr'

@Injectable({
	providedIn: 'root'
})
export class MessagesService {
	private apiURL = MESSAGERIE_URL

	constructor(private http: HttpClient) {}

	GetAllConversationByUserId(idUser: number): Observable<Conversation[]> {
		return this.http.get<Conversation[]>(`${this.apiURL}/Conversations/utilisateur/${idUser}`)
	}

	GetConversation(
		idUser1: number,
		idUser2: number,
		idMerchPost?: string
	): Observable<Conversation> {
		return this.http.get<Conversation>(
			`${this.apiURL}/Conversations/contexte?idUser1=${idUser1}&idUser2=${idUser2}&idMerchPost=${idMerchPost}`
		)
	}
}
