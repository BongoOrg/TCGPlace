import { Component, OnInit } from '@angular/core';
import {ConversationComponent} from "./conversation/conversation.component";
import {filter, Observable, tap} from "rxjs";
import {Conversation} from "../models/conversation.model";
import {ModalController} from "@ionic/angular";
import {MessagesService} from "../services/messagesService";
import {SalePostService} from "../../store/sale/services/sale-post.service";
import {UserService} from "../../core/services/UserService/user.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
})
export class ConversationListComponent implements OnInit {

  conversationComponent = ConversationComponent
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
    await this.router.navigate(['/tabs/messages/conversation'], {queryParams: {salePostId: conversation.merchPostId, idUser: idUser}});
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
