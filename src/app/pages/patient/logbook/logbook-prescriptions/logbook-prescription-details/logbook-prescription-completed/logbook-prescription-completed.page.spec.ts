import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookPrescriptionCompletedPage } from './logbook-prescription-completed.page';

describe('LogbookPrescriptionCompletedPage', () => {
  let component: LogbookPrescriptionCompletedPage;
  let fixture: ComponentFixture<LogbookPrescriptionCompletedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookPrescriptionCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
