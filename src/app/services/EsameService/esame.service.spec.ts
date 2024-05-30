import { TestBed } from '@angular/core/testing';

import { EsameService } from './esame.service';

describe('EsameService', () => {
  let service: EsameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
