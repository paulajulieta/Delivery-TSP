import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaCajeroComponent } from './pantalla-cajero.component';

describe('PantallaCajeroComponent', () => {
  let component: PantallaCajeroComponent;
  let fixture: ComponentFixture<PantallaCajeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaCajeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaCajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
