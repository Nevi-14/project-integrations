import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyBuilderDepartmentsPage } from './company-builder-departments.page';

describe('CompanyBuilderDepartmentsPage', () => {
  let component: CompanyBuilderDepartmentsPage;
  let fixture: ComponentFixture<CompanyBuilderDepartmentsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBuilderDepartmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyBuilderDepartmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
