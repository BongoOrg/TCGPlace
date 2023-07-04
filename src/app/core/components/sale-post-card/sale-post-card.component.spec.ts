import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SalePostCardComponent } from './sale-post-card.component'
import { SalePostModel } from '../../models/sale-post.model'
import { ItemModel } from '../../models/item.model'

describe('SalePostCardComponent', () => {
	let component: SalePostCardComponent
	let fixture: ComponentFixture<SalePostCardComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SalePostCardComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(SalePostCardComponent)
		component = fixture.componentInstance
		const salePost: SalePostModel = {
			salePostPrice: 1.0,
			sale_post_grading_id: 1,
			merch_price: 1.0,
			sale_post_id: 1,
			merch_id: 1,
			merch_public: true,
			merch_remarks: 'Remarks',
			sale_post_item: new ItemModel(
				1,
				'Test card',
				'https://www.pokepedia.fr/images/thumb/c/c2/Tiplouf-DEPS.png/1200px-Tiplouf-DEPS.png',
				'eb01',
				'01/100'
			)
		}
		component.salePost = salePost
		component.salePost.sale_post_item = salePost.sale_post_item
		fixture.detectChanges()
	}))

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should set the input property `salePost` correctly', () => {
		fixture.detectChanges()
		expect(component.salePost).toEqual(component.salePost)
	})
})
