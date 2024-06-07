import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookReservationCancelledPage } from './logbook-reservation-cancelled.page';

describe('LogbookReservationCancelledPage', () => {
  let component: LogbookReservationCancelledPage;
  let fixture: ComponentFixture<LogbookReservationCancelledPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookReservationCancelledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
