import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupEndPage } from './signup-end.page';

describe('SignupEndPage', () => {
  let component: SignupEndPage;
  let fixture: ComponentFixture<SignupEndPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupEndPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
