import { Component, OnInit, ViewChild } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Message } from '../models/message.model'
import { BehaviorSubject, Subscription, switchMap, Observable, tap } from 'rxjs'
import { MessagesService } from '../services/messagesService'
import { Conversation } from '../models/conversation.model'
import { UserService } from 'src/app/core/services/UserService/user.service'
import { MESSAGERIE_URL } from 'config'
import { OfferService } from 'src/app/store/sale/services/OfferService/offer.service'

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  private hubConnectionBuilder!: HubConnection
  private subscription: Subscription = new Subscription()

  salePostId?: string = ""
  salePostPrice?: number = undefined
  idUser!: number
  conversation: Conversation = new Conversation()
  newMessage: string = ""
  currentUserId!: number
  loading: boolean = true

  updateOfferLoading: boolean = false
  updateOfferId?: number

  conversationSubject: BehaviorSubject<Conversation | null> = new BehaviorSubject<Conversation | null>(null) // Utilisation d'un BehaviorSubject pour la conversation

  @ViewChild('content') private content: any

  constructor(
    private modalCtrl: ModalController,
    private messagesService: MessagesService,
    private userService: UserService,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.currentUserId = this.userService.GetCurrentUserID()
  
    this.subscription.add(
      this.conversationSubject.pipe(
        switchMap(() => this.getConversation()),
        tap(() => {
          this.loading = false;
          this.content.scrollToBottom();
        })
      ).subscribe()
    );    
  
    this.startHubConnection()
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.stopHubConnection()
  }

  private startHubConnection() {
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(`${MESSAGERIE_URL}/chatHub`)
      .configureLogging(LogLevel.Information)
      .build()

    this.hubConnectionBuilder.start()
      .then(() => {
        this.conversationSubject.next(this.conversation)
        this.content.scrollToBottom()
        this.hubConnectionBuilder.invoke("CreatePrivateConversation", this.idUser, this.userService.GetCurrentUserID(), this.salePostId)
          .then(() => {
            this.hubConnectionBuilder.on('SendMessageInConversation', (idSender: number, idReceiver: number, idMerchPost: string, messageJson: string) => {
              const message: Message = JSON.parse(messageJson)
              if (message.idUserEnvoi != this.userService.GetCurrentUserID()) {
                const currentConversation = this.conversationSubject.value
                if (currentConversation) {
                  this.conversation.messages.push(message) // Ajout du nouveau message à la liste de messages de la conversation
                  //this.conversationSubject.next(this.conversation) // Mise à jour de conversationSubject avec la nouvelle conversations
                  setTimeout(() => {
                    this.content.scrollToBottom(); // Fait défiler vers le bas après l'ajout d'un nouveau message
                  }, 600)
                }
              }
            })

            //On update ici une offre
            this.hubConnectionBuilder.on('UpdateMessageInConversation', (idSender: number, idReceiver: number, idMerchPost: string, messageJson: string) => {
              const message: Message = JSON.parse(messageJson)
              this.updateOfferId = message.offre?.id
              this.updateOfferLoading = true
              if (message != undefined) {
                this.conversation.messages.forEach(msg => {
                  if (msg != undefined && msg.offre !=undefined &&  msg.offre.id == message.offre?.id) {
                    msg.offre.etat = message.offre.etat
                    this.updateOfferLoading = false
                  }
                });
              }
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log('Error while connecting to the server')
        this.retryHubConnection()
      })
  }

  private stopHubConnection() {
    if (this.hubConnectionBuilder) {
      this.hubConnectionBuilder.stop()
    }
  }

  private retryHubConnection() {
    setTimeout(() => {
      this.startHubConnection()
    }, 100)
  }

  updateOffer(message: Message, offerStateId: string) {
    const offerId = message.offre?.id
    this.updateOfferId = offerId
    this.updateOfferLoading = true
    if (offerId != undefined && offerStateId != undefined) {
      this.offerService.updateOffer(offerId, offerStateId).subscribe(() => {
        if (this.conversation != undefined && this.conversation.messages != undefined) {
          this.conversation.messages.forEach(msg => {
            if (msg != undefined && msg.offre != undefined && msg.offre.id == offerId) {
              msg.offre.etat = offerStateId
              this.hubConnectionBuilder
                .invoke(
                  'UpdateMessageInConversation',
                  this.idUser,
                  this.userService.GetCurrentUserID(),
                  this.salePostId,
                  msg
                ).then(()=>{this.updateOfferLoading = false})
            }
          })
        }
      })
    }
  }

  getConversation(): Observable<Conversation> {
    return this.messagesService.GetConversation(this.idUser, this.userService.GetCurrentUserID(), this.salePostId).pipe(
      tap(val => {
        if (val != null) {
          this.conversation = val
          console.log('Conversation updated:', this.conversation)
        }
      })
    )
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }

  getMessageClass(idUser: number): string {
    return idUser === this.userService.GetCurrentUserID() ? 'message-sender' : 'message-receiver'
  }

  sendMessage() {
    if (this.newMessage) {
      const message: Message = {
        id: "",
        idUserEnvoi: this.userService.GetCurrentUserID(),
        dateEnvoi: new Date(),
        texte: this.newMessage,
      }
  
      this.hubConnectionBuilder
        .invoke(
          'SendMessageInConversation',
          this.idUser,
          this.userService.GetCurrentUserID(),
          this.salePostId,
          message
        )
        .catch((error) => {
          // Gérez l'erreur d'envoi du message
          console.error(error)
        })
        .then(() => {
          if (this.conversation) {
            this.conversation.messages.push(message);
            setTimeout(() => {
              this.content.scrollToBottom(); // Fait défiler vers le bas après l'ajout d'un nouveau message
            }, 100);
          }
          this.newMessage = "";
        });
    }
  }
  
}
