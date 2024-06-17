import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPrescriptionPage } from './confirm-prescription.page';

describe('ConfirmPrescriptionPage', () => {
  let component: ConfirmPrescriptionPage;
  let fixture: ComponentFixture<ConfirmPrescriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPrescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
