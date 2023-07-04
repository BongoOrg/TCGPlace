import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { BrowseSearchPostsComponent } from './browse-search-posts.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BrowseSearchPostsComponent', () => {
	let component: BrowseSearchPostsComponent
	let fixture: ComponentFixture<BrowseSearchPostsComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [BrowseSearchPostsComponent],
			imports: [IonicModule.forRoot(), HttpClientTestingModule]
		}).compileComponents()

		fixture = TestBed.createComponent(BrowseSearchPostsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
