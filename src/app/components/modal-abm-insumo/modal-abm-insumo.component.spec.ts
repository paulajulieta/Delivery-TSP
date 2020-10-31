import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAbmInsumoComponent } from './modal-abm-insumo.component';

describe('ModalAbmInsumoComponent', () => {
  let component: ModalAbmInsumoComponent;
  let fixture: ComponentFixture<ModalAbmInsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAbmInsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAbmInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
