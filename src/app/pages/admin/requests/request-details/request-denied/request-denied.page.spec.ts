import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestDeniedPage } from './request-denied.page';

describe('RequestDeniedPage', () => {
  let component: RequestDeniedPage;
  let fixture: ComponentFixture<RequestDeniedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDeniedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
