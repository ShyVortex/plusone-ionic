import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SosSurveyConfirmedPage } from './sos-survey-confirmed.page';

describe('SosSurveyConfirmedPage', () => {
  let component: SosSurveyConfirmedPage;
  let fixture: ComponentFixture<SosSurveyConfirmedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SosSurveyConfirmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
