import { TestBed } from '@angular/core/testing';

import { LocProvPaisService } from './loc-prov-pais.service';

describe('LocProvPaisService', () => {
  let service: LocProvPaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocProvPaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
