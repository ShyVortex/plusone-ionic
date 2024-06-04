import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestAcceptedPage } from './request-accepted.page';

describe('RequestAcceptedPage', () => {
  let component: RequestAcceptedPage;
  let fixture: ComponentFixture<RequestAcceptedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
