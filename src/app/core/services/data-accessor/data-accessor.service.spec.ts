import { TestBed } from '@angular/core/testing';

import { DataAccessorService } from './data-accessor.service';

describe('DataAccessorService', () => {
  let service: DataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
