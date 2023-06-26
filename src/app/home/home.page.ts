import {Component, OnInit, Renderer2} from '@angular/core';
import { register } from 'swiper/element/bundle';
import {UserModel} from "../core/models/user.model";
import {Subscription} from "rxjs";
import {UserService} from "../core/services/UserService/user.service";
import {Router} from "@angular/router";
import {ErrorStateService} from "../core/services/error-state.service";

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentUser: UserModel | null;
  errorOccurred: boolean = false;

  private errorSubscription!: Subscription;

  constructor(private userService : UserService, private renderer:Renderer2, private router:Router, private errorStateService:ErrorStateService) {
    this.currentUser = new UserModel();
  }

  ngOnInit() {

    this.errorSubscription = this.errorStateService.errorState$.subscribe(
      errorState => {
        this.errorOccurred = errorState;
      }
    );

    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
  }

  refresh() {
    this.renderer.setProperty(window, 'location', this.router.url); //refresh la page
  }
}
