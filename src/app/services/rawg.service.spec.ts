import { TestBed } from '@angular/core/testing';

import { RawgService } from './rawg.service';

describe('RawgService', () => {
  let service: RawgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
