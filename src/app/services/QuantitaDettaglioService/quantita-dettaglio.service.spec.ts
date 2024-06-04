import { TestBed } from '@angular/core/testing';

import { QuantitaDettaglioService } from './quantita-dettaglio.service';

describe('QuantitaDettaglioService', () => {
  let service: QuantitaDettaglioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantitaDettaglioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
