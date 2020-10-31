import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAbmUsuarioComponent } from './modal-abm-usuario.component';

describe('ModalAbmUsuarioComponent', () => {
  let component: ModalAbmUsuarioComponent;
  let fixture: ComponentFixture<ModalAbmUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAbmUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAbmUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
