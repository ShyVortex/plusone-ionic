import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupConfirmedPage } from './signup-confirmed.page';

describe('SignupConfirmedPage', () => {
  let component: SignupConfirmedPage;
  let fixture: ComponentFixture<SignupConfirmedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupConfirmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
