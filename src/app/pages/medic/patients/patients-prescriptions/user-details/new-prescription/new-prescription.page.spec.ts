import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPrescriptionPage } from './new-prescription.page';

describe('NewPrescriptionPage', () => {
  let component: NewPrescriptionPage;
  let fixture: ComponentFixture<NewPrescriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
