import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { TermesEtCGUComponent } from './termes-et-cgu.component'

describe('TermesEtCGUComponent', () => {
	let component: TermesEtCGUComponent
	let fixture: ComponentFixture<TermesEtCGUComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [TermesEtCGUComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(TermesEtCGUComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
