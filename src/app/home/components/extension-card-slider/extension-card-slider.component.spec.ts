import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ExtensionCardSliderComponent } from './extension-card-slider.component'

describe('ExtensionCardSliderComponent', () => {
	let component: ExtensionCardSliderComponent
	let fixture: ComponentFixture<ExtensionCardSliderComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ExtensionCardSliderComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(ExtensionCardSliderComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
