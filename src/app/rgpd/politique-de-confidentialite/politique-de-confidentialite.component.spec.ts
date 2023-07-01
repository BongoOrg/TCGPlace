import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite.component';

describe('PolitiqueDeConfidentialiteComponent', () => {
  let component: PolitiqueDeConfidentialiteComponent;
  let fixture: ComponentFixture<PolitiqueDeConfidentialiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitiqueDeConfidentialiteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolitiqueDeConfidentialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
