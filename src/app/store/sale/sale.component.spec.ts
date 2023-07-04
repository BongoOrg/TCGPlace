import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SaleComponent } from './sale.component'

describe('SaleComponent', () => {
	let component: SaleComponent
	let fixture: ComponentFixture<SaleComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SaleComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(SaleComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
