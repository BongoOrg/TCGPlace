import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { UserModel } from '../../models/user.model'
import { environment } from '../../../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private apiURL = environment.AUTH_URL
	private currentUserSubject = new BehaviorSubject<UserModel | null>(null)
	private isLoggedIn = new BehaviorSubject<boolean>(false)

	constructor(private httpClient: HttpClient) {
		const userJson = localStorage.getItem('current_user')
		if (userJson) {
			const user = JSON.parse(userJson) as UserModel
			this.currentUserSubject.next(user)
			this.isLoggedIn.next(true) // Ajoutez cette ligne
		}
	}

	setCurrentUser(user: UserModel | null) {
		localStorage.setItem('current_user', JSON.stringify(user))
		this.currentUserSubject.next(user)
		this.isLoggedIn.next(user !== null)
	}

	setCurrentUserId(id: string | undefined): void {
		if (id) {
			localStorage.setItem('current_user_id', JSON.stringify(id))
		} else {
			localStorage.removeItem('current_user_id')
		}
	}

	getCurrentUser(): Observable<UserModel | null> {
		return this.currentUserSubject.asObservable()
	}
	isLogged(): Observable<boolean> {
		return this.isLoggedIn.asObservable()
	}

	GetCurrentUserID(): number {
		var storedUser = localStorage.getItem('current_user')
		var userId
		if (storedUser) {
			let userObject = JSON.parse(storedUser)
			userId = userObject.id
		}
		return userId
	}

	GetUserInfo(token: string): Observable<any> {
		return this.httpClient.get(`${this.apiURL}/Registration/user-info`)
	}

	GetProfileInfos(idUser: string): Observable<UserModel> {
		return this.httpClient.get<UserModel>(`${this.apiURL}/Registration/profile/${idUser}`)
	}

	RegisterUser(user: any): Observable<any> {
		return this.httpClient.post(`${this.apiURL}/Registration`, user)
	}

	Login(email: string, password: string): Observable<any> {
		const body = {
			email: email,
			password: password
		}
		return this.httpClient.post(`${this.apiURL}/Registration/authenticate`, body).pipe(
			tap((response) => {
				if (response) {
					this.isLoggedIn.next(true) // Stocker l'utilisateur dans le localStorage
				}
			})
		)
	}

	Logout(): void {
		this.currentUserSubject.next(null)
		this.isLoggedIn.next(false)
		localStorage.removeItem('access_token')
		localStorage.removeItem('current_user')
		localStorage.removeItem('current_user_id')
	}
}
