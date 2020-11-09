import { TestBed } from '@angular/core/testing';

import { RolCocineroGuard } from './rol-cocinero.guard';

describe('RolCocineroGuard', () => {
  let guard: RolCocineroGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolCocineroGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
