import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { PolitiqueDeCookiesComponent } from './politique-de-cookies.component'

describe('PolitiqueDeCookiesComponent', () => {
	let component: PolitiqueDeCookiesComponent
	let fixture: ComponentFixture<PolitiqueDeCookiesComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [PolitiqueDeCookiesComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(PolitiqueDeCookiesComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
