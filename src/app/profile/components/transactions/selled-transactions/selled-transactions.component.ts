import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderModel} from "../../../../core/models/order.model";
import {TransactionService} from "../../services/TransactionService/transaction.service";
import {UserService} from "../../../../core/services/UserService/user.service";

@Component({
  selector: 'app-selled-transactions',
  templateUrl: './selled-transactions.component.html',
  styleUrls: ['./selled-transactions.component.scss'],
})
export class SelledTransactionsComponent implements OnInit {
  @Input() idUser!: number
  isLoading$ = new BehaviorSubject<boolean>(true); // set loading to true initially
  sellerTransaction$ = new BehaviorSubject<OrderModel[]>([])
  constructor(private transactionService : TransactionService) { }

  ngOnInit() {

    this.transactionService.getSellerTransaction(this.idUser).subscribe(
      res => {
        if(res.body != null){
          this.sellerTransaction$.next(res.body)
        }
        this.isLoading$.next(false);
      },
      err => {
        console.error("Error", err)
        this.isLoading$.next(false);
      }
    )
  }

}
