import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationContinuePage } from './reservation-continue.page';

describe('ReservationContinuePage', () => {
  let component: ReservationContinuePage;
  let fixture: ComponentFixture<ReservationContinuePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationContinuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
