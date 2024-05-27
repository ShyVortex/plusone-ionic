import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunctionsPatientsPage } from './functions-patients.page';

describe('FunctionsPatientsPage', () => {
  let component: FunctionsPatientsPage;
  let fixture: ComponentFixture<FunctionsPatientsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
