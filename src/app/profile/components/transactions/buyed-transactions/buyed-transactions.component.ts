import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../services/TransactionService/transaction.service";
import {BehaviorSubject} from "rxjs";
import {OrderModel} from "../../../../core/models/order.model";

@Component({
  selector: 'app-buyed-transactions',
  templateUrl: './buyed-transactions.component.html',
  styleUrls: ['./buyed-transactions.component.scss'],
})
export class BuyedTransactionsComponent implements OnInit {

  buyedTransaction$ = new BehaviorSubject<OrderModel[]>([])
  constructor(private transactionService : TransactionService) { }

  ngOnInit() {
    this.transactionService.getBuyerTransaction(3).subscribe(
      res => {
        if(res.body != null){
          this.buyedTransaction$.next(res.body)
        }
      },
      err => {
        console.error("Error", err)
      }
    )
  }

}
