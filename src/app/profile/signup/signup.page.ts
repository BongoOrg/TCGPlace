import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastService } from '../../core/services/toast.service'
import { UserService } from '../../core/services/UserService/user.service'
import { CountryService } from '../../core/services/CountryService/country.service'
import { format, parseISO } from 'date-fns'
import { th } from 'date-fns/locale'
@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
	form!: FormGroup
	countries: any[] = []
	currentCountry: undefined
	dateValue = format(new Date(), 'yyyy-MM-dd')
	formatedString = ''
	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private router: Router,
		private toastService: ToastService,
		private countryService: CountryService
	) {
		this.setToday()
	}

	setToday() {
		this.formatedString = format(parseISO(format(new Date(), 'yyyy-MM-dd')), 'yyyy/MM/dd')
	}
	dateChanged(value: any) {
		this.dateValue = value.value
		this.formatedString = format(parseISO(this.dateValue), 'yyyy/MM/dd')
	}
	ngOnInit() {
		this.form = this.createForm()
		this.countryService.GetAllCountry().subscribe((countries) => {
			this.countries = countries
		})
	}
	handleChange(ev: any) {
		this.currentCountry = ev.target.value
	}

	createForm(): FormGroup {
		return this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			username: ['', [Validators.required]],
			firstname: ['', [Validators.required]],
			lastname: ['', [Validators.required]],
			birthDate: ['', [Validators.required]],
			adress: ['', [Validators.required]],
			city: ['', [Validators.required]],
			countryId: ['', Validators.required],
			postalCode: ['', [Validators.required]],
			conditions: [false, [Validators.requiredTrue]]
		})
	}

	onSubmit() {
		const user = {
			username: this.form.value.username,
			email: this.form.value.email,
			password: this.form.value.password,
			firstname: this.form.value.firstname,
			lastname: this.form.value.lastname,
			birthDate: this.form.value.birthDate,
			adress: this.form.value.adress,
			city: this.form.value.city,
			countryId: this.form.value.countryId,
			postalCode: this.form.value.postalCode,
			conditions: this.form.value.conditions
		}
		this.userService.RegisterUser(user).subscribe(
			(response) => {
				this.router.navigateByUrl('/tabs/profil')
				this.toastService.presentToastSuccess('Insciption réussie', 2000)
			},
			(error) => {
				console.error('Erreur lors de linsctiption', error)
			}
		)
	}
}
