import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SkeletonGridComponent } from './skeleton-grid.component'

describe('SkeletonGridComponent', () => {
	let component: SkeletonGridComponent
	let fixture: ComponentFixture<SkeletonGridComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SkeletonGridComponent],
			imports: [IonicModule.forRoot()]
		}).compileComponents()

		fixture = TestBed.createComponent(SkeletonGridComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
