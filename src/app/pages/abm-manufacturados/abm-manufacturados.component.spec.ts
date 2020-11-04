import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmManufacturadosComponent } from './abm-manufacturados.component';

describe('AbmManufacturadosComponent', () => {
  let component: AbmManufacturadosComponent;
  let fixture: ComponentFixture<AbmManufacturadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmManufacturadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmManufacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
