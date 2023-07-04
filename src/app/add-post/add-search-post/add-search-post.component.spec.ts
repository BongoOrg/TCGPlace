import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { AddSearchPostComponent } from './add-search-post.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRoute } from '@angular/router'

describe('AddSearchPostComponent', () => {
	let component: AddSearchPostComponent
	let fixture: ComponentFixture<AddSearchPostComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AddSearchPostComponent],
			imports: [IonicModule.forRoot(), HttpClientTestingModule],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: { snapshot: { params: { id: '1' } } }
				}
			]
		}).compileComponents()

		fixture = TestBed.createComponent(AddSearchPostComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
