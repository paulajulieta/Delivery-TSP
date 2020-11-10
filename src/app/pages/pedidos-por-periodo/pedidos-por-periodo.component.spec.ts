import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPorPeriodoComponent } from './pedidos-por-periodo.component';

describe('PedidosPorPeriodoComponent', () => {
  let component: PedidosPorPeriodoComponent;
  let fixture: ComponentFixture<PedidosPorPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPorPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPorPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
