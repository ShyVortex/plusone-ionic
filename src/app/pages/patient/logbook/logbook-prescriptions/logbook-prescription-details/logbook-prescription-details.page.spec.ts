import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookPrescriptionDetailsPage } from './logbook-prescription-details.page';

describe('LogbookPrescriptionDetailsPage', () => {
  let component: LogbookPrescriptionDetailsPage;
  let fixture: ComponentFixture<LogbookPrescriptionDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookPrescriptionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
