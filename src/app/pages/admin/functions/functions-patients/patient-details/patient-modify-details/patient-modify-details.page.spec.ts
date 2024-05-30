import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientModifyDetailsPage } from './patient-modify-details.page';

describe('PatientModifyDetailsPage', () => {
  let component: PatientModifyDetailsPage;
  let fixture: ComponentFixture<PatientModifyDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientModifyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
