import {Component, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {SalePostModel} from "../../../core/models/sale-post.model";
import {PaymentService} from "../../../core/services/PaymentService/payment.service";
import {test} from "@playwright/test";
import {UserService} from "../../../core/services/UserService/user.service";
import {takeUntil} from "rxjs/operators";
import {UserModel} from "../../../core/models/user.model";
import {Subject} from "rxjs";
import {ToastService} from "../../../core/services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy{
  totalPrice?: number;
  currentUser!: UserModel | null;
  private destroy$ = new Subject<void>();
  deliveryOptions = [
    {
      icon: "location-outline",
      label: "Point relais",
      price: 2
    },
    {
      icon: "home-outline",
      label: "Domicile",
      price: 10
    }
  ];
  selectedValue?: number = 0;
  loading: boolean = false;

  post? : SalePostModel
  constructor(private router : Router, private modalCtrl: ModalController, private paymentService : PaymentService, private userService : UserService, private toastService : ToastService) {
  }

  ngOnInit() {
    this.totalPrice = this.post?.price; // Ajustez cette ligne si nécessaire
    this.userService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.currentUser = user;
    });
  }
  onRadioChange(event : any) {
    this.selectedValue = parseInt(event.detail.value);
    if(this.post?.price){
      this.totalPrice = this.post?.price + this.selectedValue
    }
  }

  async pay(){
    this.loading = true;
    const postInfo = {
      shipAddress: this.currentUser?.adress,
      merchPostId: this.post?.id,
      sellerId: this.post?.userId,
      buyerId: this.currentUser?.id,
      totalPrice: this.totalPrice,
      stateId: 'O',
      shipmentFee : this.selectedValue
    };
    this.paymentService.Pay(postInfo).subscribe({
      next: async (response) => {
        if(response.status == 200){
          this.loading = false;
          this.toastService.presentToastSuccess("Commande effectuée")
          await this.modalCtrl.dismiss();
          this.router.navigateByUrl("tabs/home")
        }
      },
      error: (err) => {
        console.error("Une erreur s'est produite lors de la requête HTTP :", err);
        this.toastService.presentToastError("Erreur lors de la création de l'annonce");
      }
    });
  }

  ngOnDestroy() {
    // déclencher le Subject lors de la destruction du composant
    this.destroy$.next();
    this.destroy$.complete();
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}
