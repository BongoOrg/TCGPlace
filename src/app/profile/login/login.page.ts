import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../../core/services/UserService/user.service'
import { ToastService } from '../../core/services/toast.service'
import { UserModel } from '../../core/models/user.model'

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	form!: FormGroup

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private toastService: ToastService
	) {}

	createForm(): FormGroup {
		return this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		})
	}

	signUp() {
		this.router.navigate(['/signup'])
	}

	onSubmit() {
		const user = {
			email: this.form.value.email,
			password: this.form.value.password
		}

		this.userService.Login(user.email, user.password).subscribe(
			(response) => {
				this.toastService.presentToastSuccess('Authentification réussie !', 2000)
				localStorage.setItem('access_token', response.accessToken)
				const accessToken = localStorage.getItem('access_token')
				if (accessToken) {
					this.userService.GetUserInfo(accessToken).subscribe(
						(res) => {
							const user = Object.assign(new UserModel(), res.user)
							this.userService.setCurrentUser(user)
						},
						(error) => {
							console.error('erreur')
						}
					)
				}
				this.router.navigateByUrl('/tabs/home')
			},
			(error) => {
				console.error('Erreur lors de la connexion', error)
			}
		)
	}
	ngOnInit() {
		this.form = this.createForm()
	}
}
