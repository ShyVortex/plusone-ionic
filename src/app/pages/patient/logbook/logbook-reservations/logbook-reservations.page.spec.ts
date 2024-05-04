import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookReservationsPage } from './logbook-reservations.page';

describe('LogbookReservationsPage', () => {
  let component: LogbookReservationsPage;
  let fixture: ComponentFixture<LogbookReservationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookReservationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
