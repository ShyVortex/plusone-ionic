import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SosRequestDeniedPage } from './sos-request-denied.page';

describe('SosRequestDeniedPage', () => {
  let component: SosRequestDeniedPage;
  let fixture: ComponentFixture<SosRequestDeniedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SosRequestDeniedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
