import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from "../../services/TransactionService/transaction.service";
import {BehaviorSubject, tap} from "rxjs";
import {OrderModel} from "../../../../core/models/order.model";

@Component({
  selector: 'app-buyed-transactions',
  templateUrl: './buyed-transactions.component.html',
  styleUrls: ['./buyed-transactions.component.scss'],
})
export class BuyedTransactionsComponent implements OnInit {
  @Input() idUser!: number
  isLoading$ = new BehaviorSubject<boolean>(true); // set loading to true initially
  buyedTransaction$ = new BehaviorSubject<OrderModel[]>([])
  constructor(private transactionService : TransactionService) { }

  ngOnInit() {
    this.transactionService.getBuyerTransaction(this.idUser).subscribe(
      res => {
        if(res.body != null){
          this.buyedTransaction$.next(res.body)
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
