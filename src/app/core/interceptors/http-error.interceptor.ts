import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, of } from 'rxjs'
import { ToastService } from '../services/toast.service'
import { ErrorStateService } from '../services/error-state.service'

@Injectable({
	providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
	private readonly ERROR_INTERNAL_SERVER = 'Erreur interne au serveur survenue !'
	private readonly ERROR_BAD_REQUEST = 'Erreur de requête !'
	private readonly ERROR_USER_EXISTS = 'Utilisateur existe déjà'
	private readonly ERROR_INVALID_CREDENTIALS = 'Mauvais email ou mot de passe'
	private readonly ERROR_SERVER_UNREACHABLE = 'Serveur inatteignable'

	constructor(private toastService: ToastService, private errorStateService: ErrorStateService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Add Bearer token to the request headers if it exists
		const token = localStorage.getItem('access_token')
		if (token) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			})
		}

		return next.handle(req).pipe(
			catchError((err: any) => {
				if (err instanceof HttpErrorResponse) {
					try {
						switch (err.status) {
							case 500:
								this.toastService.presentToastError(this.ERROR_INTERNAL_SERVER)
								this.errorStateService.setErrorState(true)
								break
							case 400:
								this.toastService.presentToastError(this.ERROR_BAD_REQUEST)
								this.errorStateService.setErrorState(true)
								break
							case 409:
								this.toastService.presentToastAlreadyExist(this.ERROR_USER_EXISTS)
								break
							case 401:
								this.toastService.presentToastError(this.ERROR_INVALID_CREDENTIALS)
								break
							default:
								this.toastService.presentToastError(this.ERROR_SERVER_UNREACHABLE)
								this.errorStateService.setErrorState(true)
						}
					} catch (e) {
						this.toastService.presentToastError(this.ERROR_SERVER_UNREACHABLE)
						this.errorStateService.setErrorState(true)
					}
				}
				return of(err)
			})
		)
	}
}
