import { TestBed } from '@angular/core/testing';

import { RolCajeroGuard } from './rol-cajero.guard';

describe('RolCajeroGuard', () => {
  let guard: RolCajeroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolCajeroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
