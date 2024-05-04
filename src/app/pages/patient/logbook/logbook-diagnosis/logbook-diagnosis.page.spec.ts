import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookDiagnosisPage } from './logbook-diagnosis.page';

describe('LogbookDiagnosisPage', () => {
  let component: LogbookDiagnosisPage;
  let fixture: ComponentFixture<LogbookDiagnosisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookDiagnosisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
