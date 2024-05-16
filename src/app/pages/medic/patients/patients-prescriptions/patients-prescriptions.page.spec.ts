import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsPrescriptionsPage } from './patients-prescriptions.page';

describe('PatientsPrescriptionsPage', () => {
  let component: PatientsPrescriptionsPage;
  let fixture: ComponentFixture<PatientsPrescriptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsPrescriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
