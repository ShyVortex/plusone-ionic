import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupPendingPage } from './signup-pending.page';

describe('SignupPendingPage', () => {
  let component: SignupPendingPage;
  let fixture: ComponentFixture<SignupPendingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
