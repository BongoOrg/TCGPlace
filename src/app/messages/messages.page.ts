import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Observable, tap, filter } from 'rxjs'
import { UserService } from 'src/app/core/services/UserService/user.service'
import { MessagesService } from './services/messagesService'
import { Conversation } from './models/conversation.model'
import { ConversationComponent } from './conversation-list/conversation/conversation.component'
import { SalePostService } from '../store/sale/services/sale-post.service'
import { NavigationEnd, Router } from '@angular/router'
import { ConversationListComponent } from './conversation-list/conversation-list.component'

@Component({
	selector: 'app-conversation',
	templateUrl: './messages.page.html',
	styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit {
	conversationListComponent = ConversationListComponent
	ngOnInit(): void {}
}
