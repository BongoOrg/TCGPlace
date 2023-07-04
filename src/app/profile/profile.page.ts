import { Component, OnInit, OnDestroy } from '@angular/core'
import { UserService } from '../core/services/UserService/user.service'
import { UserModel } from '../core/models/user.model'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { HomePage } from '../home/home.page'
import { ToastService } from '../core/services/toast.service'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
	component = HomePage
	isLogged = false
	currentUser!: UserModel | null
	private destroy$ = new Subject<void>()

	constructor(private userService: UserService, private toastService: ToastService) {}

	ngOnInit() {
		this.userService
			.getCurrentUser()
			.pipe(takeUntil(this.destroy$))
			.subscribe((user) => {
				this.currentUser = user
				if (user) {
					localStorage.setItem('current_user_id', JSON.stringify(user.id))
				}
			})
		this.userService
			.isLogged()
			.pipe(takeUntil(this.destroy$))
			.subscribe((logged) => {
				this.isLogged = logged
			})
	}

	ngOnDestroy() {
		// déclencher le Subject lors de la destruction du composant
		this.destroy$.next()
		this.destroy$.complete()
	}

	logout() {
		this.userService.Logout()
	}

	notAvailable() {
		this.toastService.presentToastNotAvailable()
	}
}
