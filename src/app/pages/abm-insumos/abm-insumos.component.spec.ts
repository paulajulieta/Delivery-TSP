import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmInsumosComponent } from './abm-insumos.component';

describe('AbmInsumosComponent', () => {
  let component: AbmInsumosComponent;
  let fixture: ComponentFixture<AbmInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
