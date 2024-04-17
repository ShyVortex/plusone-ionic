import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupContinuePage } from './signup-continue.page';

describe('SignupContinuePage', () => {
  let component: SignupContinuePage;
  let fixture: ComponentFixture<SignupContinuePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupContinuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
