import { TestBed } from '@angular/core/testing';

import { TfarmacologicaService } from './tfarmacologica.service';

describe('TfarmacologicaService', () => {
  let service: TfarmacologicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfarmacologicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
