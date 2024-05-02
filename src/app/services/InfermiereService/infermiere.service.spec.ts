import { TestBed } from '@angular/core/testing';

import { InfermiereService } from './infermiere.service';

describe('InfermiereService', () => {
  let service: InfermiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfermiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
