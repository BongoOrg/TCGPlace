import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MessagesPage } from './messages.page'
import { ConversationComponent } from './conversation-list/conversation/conversation.component'

const routes: Routes = [
	{
		path: '',
		component: MessagesPage
	},
	{
		path: 'conversation',
		component: ConversationComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MessagesPageRoutingModule {}
