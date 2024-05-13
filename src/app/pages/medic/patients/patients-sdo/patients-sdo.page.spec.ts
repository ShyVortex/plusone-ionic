import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsSdoPage } from './patients-sdo.page';

describe('PatientsSdoPage', () => {
  let component: PatientsSdoPage;
  let fixture: ComponentFixture<PatientsSdoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsSdoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
