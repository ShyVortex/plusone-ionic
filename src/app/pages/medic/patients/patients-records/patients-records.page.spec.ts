import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsRecordsPage } from './patients-records.page';

describe('PatientsRecordsPage', () => {
  let component: PatientsRecordsPage;
  let fixture: ComponentFixture<PatientsRecordsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsRecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
