import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SosSurveyPage } from './sos-survey.page';

describe('SosSurveyPage', () => {
  let component: SosSurveyPage;
  let fixture: ComponentFixture<SosSurveyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SosSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
