import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { BrowseSalePostsComponent } from './browse-sale-posts.component'

describe('BrowseSalePostsComponent', () => {
	let component: BrowseSalePostsComponent
	let fixture: ComponentFixture<BrowseSalePostsComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [BrowseSalePostsComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(BrowseSalePostsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
