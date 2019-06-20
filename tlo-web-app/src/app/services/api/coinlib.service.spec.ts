import { TestBed } from '@angular/core/testing';

import { CoinlibService } from './coinlib.service';

describe('CoinlibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoinlibService = TestBed.get(CoinlibService);
    expect(service).toBeTruthy();
  });
});
