import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDomicilioComponent } from './modal-domicilio.component';

describe('ModalDomicilioComponent', () => {
  let component: ModalDomicilioComponent;
  let fixture: ComponentFixture<ModalDomicilioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDomicilioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
