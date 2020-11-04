import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAbmManufacturadosComponent } from './modal-abm-manufacturados.component';

describe('ModalAbmManufacturadosComponent', () => {
  let component: ModalAbmManufacturadosComponent;
  let fixture: ComponentFixture<ModalAbmManufacturadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAbmManufacturadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAbmManufacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
