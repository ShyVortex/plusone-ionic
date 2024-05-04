import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationDeniedPage } from './reservation-denied.page';

describe('ReservationDeniedPage', () => {
  let component: ReservationDeniedPage;
  let fixture: ComponentFixture<ReservationDeniedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDeniedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
