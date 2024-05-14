import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsIllcertPage } from './patients-illcert.page';

describe('PatientsIllcertPage', () => {
  let component: PatientsIllcertPage;
  let fixture: ComponentFixture<PatientsIllcertPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsIllcertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
