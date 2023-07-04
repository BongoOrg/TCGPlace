import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AddPostPage } from './add-post.page'
import { AddSalePostComponent } from './add-sale-post/add-sale-post.component'
import { AddSearchPostComponent } from './add-search-post/add-search-post.component'

const routes: Routes = [
	{
		path: '',
		component: AddPostPage
	},
	{
		path: 'sale/:id',
		component: AddSalePostComponent
	},
	{
		path: 'search/:id',
		component: AddSearchPostComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AddPostPageRoutingModule {}
