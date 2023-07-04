import { Component, Input, OnInit } from '@angular/core'
import { UserService } from '../../../core/services/UserService/user.service'
import { OrderModel } from '../../../core/models/order.model'

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
	saleSelected: boolean = true
	idUser!: number
	selectedTransaction!: OrderModel
	constructor(private userService: UserService) {}

	ngOnInit() {
		this.idUser = this.userService.GetCurrentUserID()
	}
}
