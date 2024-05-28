import { TestBed } from '@angular/core/testing';

import { FarmacoService } from './farmaco.service';

describe('FarmacoService', () => {
  let service: FarmacoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmacoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
