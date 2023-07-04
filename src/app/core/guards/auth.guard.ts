import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Route,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import { map, Observable } from 'rxjs'
import { UserService } from '../services/UserService/user.service'

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: UserService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authService.isLogged().pipe(
			map((isAuthenticated) => {
				if (!isAuthenticated) {
					return this.router.createUrlTree(['/login'])
				}
				return isAuthenticated
			})
		)
	}
}
