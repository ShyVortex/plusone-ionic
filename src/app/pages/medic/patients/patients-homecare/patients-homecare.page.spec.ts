import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsHomecarePage } from './patients-homecare.page';

describe('PatientsHomecarePage', () => {
  let component: PatientsHomecarePage;
  let fixture: ComponentFixture<PatientsHomecarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsHomecarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
