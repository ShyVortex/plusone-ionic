import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookPrescriptionsPage } from './logbook-prescriptions.page';

describe('LogbookPrescriptionsPage', () => {
  let component: LogbookPrescriptionsPage;
  let fixture: ComponentFixture<LogbookPrescriptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookPrescriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
