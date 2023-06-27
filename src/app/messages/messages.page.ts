import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import {
  Subject,
  BehaviorSubject,
  Subscription,
  switchMap,
  Observable,
  tap,
  forkJoin,
  map,
  catchError,
  of,
  filter
} from 'rxjs';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { MESSAGERIE_URL } from 'config';
import { MessagesService } from './services/messagesService';
import { Conversation } from './models/conversation.model';
import { Message } from './models/message.model';
import { ConversationComponent } from './conversation/conversation.component';
import { SalePostService } from '../store/sale/services/sale-post.service';
import { SalePostModel } from '../core/models/sale-post.model';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-conversation',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit {

  conversations$!: Observable<Conversation[]>
  currentUserId!: number
  private isLoading: boolean = true;
  constructor(
    private modalCtrl: ModalController,
    private messagesService: MessagesService,
    private salePostService: SalePostService,
    private userService: UserService,
    private router:Router
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Chaque fois qu'une navigation se termine, actualisez les données
        this.conversations$ = this.messagesService.GetAllConversationByUserId(this.currentUserId)
      });
  }

  ngOnInit(): void {
    this.currentUserId = this.userService.GetCurrentUserID()
    this.conversations$ = this.messagesService.GetAllConversationByUserId(this.currentUserId)
  }

  async showConv(conversation: Conversation, idUser: number) {
    //const salePost = await this.salePostService.getSingleSalePost(conversation.merchPostId)
    const modal = await this.modalCtrl.create({
      component: ConversationComponent,
      componentProps: { salePostId: conversation.merchPostId, idUser: idUser }
    });
    await modal.present();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.isLoading = true;
      this.conversations$ = this.messagesService.GetAllConversationByUserId(this.currentUserId).pipe(
        tap(() => this.isLoading = false)
      )
      event.target.complete();
    }, 0);
  }
}
