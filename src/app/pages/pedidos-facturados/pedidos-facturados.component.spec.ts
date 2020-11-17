import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosFacturadosComponent } from './pedidos-facturados.component';

describe('PedidosFacturadosComponent', () => {
  let component: PedidosFacturadosComponent;
  let fixture: ComponentFixture<PedidosFacturadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosFacturadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosFacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
