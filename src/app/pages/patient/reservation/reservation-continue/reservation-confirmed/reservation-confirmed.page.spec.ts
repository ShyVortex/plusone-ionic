import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationConfirmedPage } from './reservation-confirmed.page';

describe('ReservationConfirmedPage', () => {
  let component: ReservationConfirmedPage;
  let fixture: ComponentFixture<ReservationConfirmedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationConfirmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
