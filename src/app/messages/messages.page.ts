import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject, BehaviorSubject, Subscription, switchMap, Observable, tap, forkJoin, map, catchError, of } from 'rxjs';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { MESSAGERIE_URL } from 'config';
import { MessagesService } from './services/messagesService';
import { Conversation } from './models/conversation.model';
import { Message } from './models/message.model';
import { ConversationComponent } from './conversation/conversation.component';
import { SalePostService } from '../store/sale/services/sale-post.service';
import { SalePostModel } from '../core/models/sale-post.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit {

  conversations$!: Observable<Conversation[]>
  currentUserId!: number
  constructor(
    private modalCtrl: ModalController,
    private messagesService: MessagesService,
    private salePostService: SalePostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.userService.GetCurrentUserID()
    this.conversations$ = this.messagesService.GetAllConversationByUserId(this.currentUserId).pipe(
      tap(r => console.log(r))
    )
  }

  async showConv(conversation: Conversation, idUser: number) {
    //const salePost = await this.salePostService.getSingleSalePost(conversation.merchPostId)
    const modal = await this.modalCtrl.create({
      component: ConversationComponent,
      componentProps: { salePostId: conversation.merchPostId, idUser: idUser }
    });
    await modal.present();
  }
}
