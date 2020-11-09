import { TestBed } from '@angular/core/testing';

import { AuthGuardPageGuard } from './auth-guard-page.guard';

describe('AuthGuardPageGuard', () => {
  let guard: AuthGuardPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
