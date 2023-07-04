import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { MessagesPageRoutingModule } from './messages-routing.module'

import { MessagesPage } from './messages.page'
import { ConversationComponent } from './conversation-list/conversation/conversation.component'
import { ConversationListComponent } from './conversation-list/conversation-list.component'

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, MessagesPageRoutingModule],
	declarations: [MessagesPage, ConversationComponent, ConversationListComponent]
})
export class MessagesPageModule {}
