import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiarContrasenaComponent } from './modal-cambiar-contrasena.component';

describe('ModalCambiarContrasenaComponent', () => {
  let component: ModalCambiarContrasenaComponent;
  let fixture: ComponentFixture<ModalCambiarContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCambiarContrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
