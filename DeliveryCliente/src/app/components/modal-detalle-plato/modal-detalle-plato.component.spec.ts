import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallePlatoComponent } from './modal-detalle-plato.component';

describe('ModalDetallePlatoComponent', () => {
  let component: ModalDetallePlatoComponent;
  let fixture: ComponentFixture<ModalDetallePlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallePlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallePlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
