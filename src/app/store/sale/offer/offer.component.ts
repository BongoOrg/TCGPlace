import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalePostModel } from 'src/app/core/models/sale-post.model';
import { Observable, filter, map, of, tap } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferService } from '../services/OfferService/offer.service';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { HttpResponse } from '@angular/common/http';
import { ConversationComponent } from 'src/app/messages/conversation-list/conversation/conversation.component';
import { SalePostService } from '../services/sale-post.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  constructor(private router: Router, private modalController: ModalController, private toastService: ToastService, private userService: UserService, private offerService: OfferService, private route: ActivatedRoute, private formBuilder: FormBuilder, private salePostService: SalePostService, private navCtrl: NavController) { }

  salePost!: SalePostModel | null
  SalePost$: Observable<SalePostModel | null> = of(new SalePostModel())
  loading: boolean = true
  form!: FormGroup

  ngOnInit() {
    const idSalePost = this.route.snapshot.params['id']
    this.SalePost$ = this.salePostService.getSingleSalePost(this.route.snapshot.params['id']).pipe(
      filter((value) => value !== null),
      tap(_ => this.loading = false),
      map(response => response.body),
    )
    this.form = this.createForm()
  }

  async dismiss() {
    await this.navCtrl.back()
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      price: ['', [Validators.required, this.validatePositiveNumber]]
    });
  }

  validatePositiveNumber(control: FormControl) {
    const value = control.value;
    if (value < 0 || (typeof value === 'string' && value.startsWith('-'))) {
      return { negativeNumber: true }
    }
    return null;
  }

  onSubmit(salePost: SalePostModel) {
    const price: number = this.form.value.price
    this.loading = true
    this.offerService.createOffer(salePost.id, "null", this.userService.GetCurrentUserID(), price).subscribe({
      next: async (response: HttpResponse<any>) => {
        if (response.status == 201) {
          this.toastService.presentToastSuccess("Offre créée")
          this.loading = false;
          /*this.router.navigateByUrl("/tabs/messages")
          const modal = await this.modalController.create({
            component: ConversationComponent,
            componentProps: { salePostId: salePost.id, idUser: salePost.userId, salePostPrice: salePost.price }
          });
          await modal.present();*/
          await this.router.navigate(['/tabs/messages/conversation'], {queryParams: {salePostId: salePost.id, idUser: salePost.userId}});
        }
      }
    })
  }
}
