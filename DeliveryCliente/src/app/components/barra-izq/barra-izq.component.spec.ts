import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraIzqComponent } from './barra-izq.component';

describe('BarraIzqComponent', () => {
  let component: BarraIzqComponent;
  let fixture: ComponentFixture<BarraIzqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraIzqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraIzqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
