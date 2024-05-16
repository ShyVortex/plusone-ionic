import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsAssistancePage } from './patients-assistance.page';

describe('PatientsAssistancePage', () => {
  let component: PatientsAssistancePage;
  let fixture: ComponentFixture<PatientsAssistancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsAssistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
