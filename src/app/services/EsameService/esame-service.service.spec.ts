import { TestBed } from '@angular/core/testing';

import { EsameServiceService } from './esame-service.service';

describe('EsameServiceService', () => {
  let service: EsameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
