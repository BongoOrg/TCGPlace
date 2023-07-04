import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { TransactionService } from '../../services/TransactionService/transaction.service'
import { OrderModel } from '../../../../core/models/order.model'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
	selector: 'app-detail-transaction',
	templateUrl: './detail-transaction.component.html',
	styleUrls: ['./detail-transaction.component.scss']
})
export class DetailTransactionComponent implements OnInit, OnDestroy {
	subscription!: Subscription
	transaction: OrderModel | null = null

	constructor(private transactionService: TransactionService, private route: ActivatedRoute) {}

	ngOnInit() {
		const transactionType = this.route.snapshot.params['type'] // 'buy' or 'sell'
		const transactionId = this.route.snapshot.params['id']

		if (transactionType === 'buy') {
			this.transactionService.getBuyedTransactionDetail(this.route.snapshot.params['id']).subscribe(
				(res) => {
					if (res.body != null) {
						this.transaction = res.body
					}
				},
				(err) => {
					console.error('Error', err)
				}
			)
		} else if (transactionType === 'sell') {
			this.transactionService
				.getSelledTransactionDetail(this.route.snapshot.params['id'])
				.subscribe(
					(res) => {
						if (res.body != null) {
							this.transaction = res.body
						}
					},
					(err) => {
						console.error('Error', err)
					}
				)
		}
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}
}
