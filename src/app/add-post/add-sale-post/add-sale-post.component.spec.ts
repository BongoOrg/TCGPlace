import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { AddSalePostComponent } from './add-sale-post.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'

describe('AddSalePostComponent', () => {
	let component: AddSalePostComponent
	let fixture: ComponentFixture<AddSalePostComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							params: {
								id: '63f3f4f35554fee600a53226'
							}
						}
					}
				}
			],
			declarations: [AddSalePostComponent],
			imports: [IonicModule.forRoot(), HttpClientModule, RouterTestingModule]
		}).compileComponents()

		fixture = TestBed.createComponent(AddSalePostComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
