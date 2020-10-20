import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIngresoComponent } from './modal-ingreso.component';

describe('ModalIngresoComponent', () => {
  let component: ModalIngresoComponent;
  let fixture: ComponentFixture<ModalIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
