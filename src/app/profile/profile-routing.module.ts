import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import {LikesComponent} from "./components/likes/likes.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {ViewProfileComponent} from "./components/view-profile/view-profile.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'likes',
    component: LikesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transactions',
    component : TransactionsComponent
  },
  {
    path: ':id',
    component: ViewProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
