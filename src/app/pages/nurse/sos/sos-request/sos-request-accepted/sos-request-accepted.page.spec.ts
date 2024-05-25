import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SosRequestAcceptedPage } from './sos-request-accepted.page';

describe('SosRequestAcceptedPage', () => {
  let component: SosRequestAcceptedPage;
  let fixture: ComponentFixture<SosRequestAcceptedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SosRequestAcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
