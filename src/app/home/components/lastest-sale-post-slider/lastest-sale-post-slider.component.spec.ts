import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { LastestSalePostSliderComponent } from './lastest-sale-post-slider.component'

describe('LastestSalePostSliderComponent', () => {
	let component: LastestSalePostSliderComponent
	let fixture: ComponentFixture<LastestSalePostSliderComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [LastestSalePostSliderComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(LastestSalePostSliderComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
