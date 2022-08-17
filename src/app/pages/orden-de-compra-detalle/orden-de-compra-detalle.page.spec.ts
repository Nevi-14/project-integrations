import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdenDeCompraDetallePage } from './orden-de-compra-detalle.page';

describe('OrdenDeCompraDetallePage', () => {
  let component: OrdenDeCompraDetallePage;
  let fixture: ComponentFixture<OrdenDeCompraDetallePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDeCompraDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenDeCompraDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
