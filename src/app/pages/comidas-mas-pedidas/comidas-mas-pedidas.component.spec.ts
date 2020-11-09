import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidasMasPedidasComponent } from './comidas-mas-pedidas.component';

describe('ComidasMasPedidasComponent', () => {
  let component: ComidasMasPedidasComponent;
  let fixture: ComponentFixture<ComidasMasPedidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidasMasPedidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidasMasPedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
