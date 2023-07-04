import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SearchPostCardComponent } from './search-post-card.component'
import { SearchPostModel } from '../../models/search-post.model'
import { ItemModel } from '../../models/item.model'
import { GradingModel } from '../../models/grading.model'

describe('SearchPostCardComponent', () => {
	let component: SearchPostCardComponent
	let fixture: ComponentFixture<SearchPostCardComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SearchPostCardComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(SearchPostCardComponent)
		component = fixture.componentInstance

		const searchPost: SearchPostModel = {
			merch_remarks: 'Remarks',
			merch_public: true,
			name: 'Test SP',
			price: 1.0,
			merch_id: 1,
			gradingId: 1,
			itemId: 1,
			statePostId: 'C',
			id: 1,
			remarks: 'Remarks',
			isPublic: true,
			userId: 1,
			itemName: 'Test card',
			itemExtension: 'eb01',
			itemNumber: '01/100',
			image: 'https://www.pokepedia.fr/images/thumb/c/c2/Tiplouf-DEPS.png/1200px-Tiplouf-DEPS.png',
			merch_price: 1.0,
			grading: {
				id: 1,
				name: 'Neuf'
			}
		}
		component.searchPost = searchPost
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
