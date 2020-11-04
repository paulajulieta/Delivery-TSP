import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAbmDetalleManufacturadosComponent } from './modal-abm-detalle-manufacturados.component';

describe('ModalAbmDetalleManufacturadosComponent', () => {
  let component: ModalAbmDetalleManufacturadosComponent;
  let fixture: ComponentFixture<ModalAbmDetalleManufacturadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAbmDetalleManufacturadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAbmDetalleManufacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
