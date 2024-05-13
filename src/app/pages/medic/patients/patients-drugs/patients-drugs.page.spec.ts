import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsDrugsPage } from './patients-drugs.page';

describe('PatientsDrugsPage', () => {
  let component: PatientsDrugsPage;
  let fixture: ComponentFixture<PatientsDrugsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsDrugsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
