import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaCocineroComponent } from './pantalla-cocinero.component';

describe('PantallaCocineroComponent', () => {
  let component: PantallaCocineroComponent;
  let fixture: ComponentFixture<PantallaCocineroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaCocineroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaCocineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
