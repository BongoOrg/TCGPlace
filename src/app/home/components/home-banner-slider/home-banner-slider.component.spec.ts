import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { HomeBannerSliderComponent } from './home-banner-slider.component'

describe('HomeBannerSliderComponent', () => {
	let component: HomeBannerSliderComponent
	let fixture: ComponentFixture<HomeBannerSliderComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [HomeBannerSliderComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(HomeBannerSliderComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
