import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookReservationDetailsPage } from './logbook-reservation-details.page';

describe('LogbookReservationDetailsPage', () => {
  let component: LogbookReservationDetailsPage;
  let fixture: ComponentFixture<LogbookReservationDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookReservationDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
