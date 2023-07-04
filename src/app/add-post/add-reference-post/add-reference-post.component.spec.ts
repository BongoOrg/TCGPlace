import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { AddReferencePostComponent } from './add-reference-post.component'
import { HttpClientModule } from '@angular/common/http'

describe('AddReferenceSalePostComponent', () => {
	let component: AddReferencePostComponent
	let fixture: ComponentFixture<AddReferencePostComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AddReferencePostComponent],
			imports: [IonicModule.forRoot(), HttpClientModule]
		}).compileComponents()

		fixture = TestBed.createComponent(AddReferencePostComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
