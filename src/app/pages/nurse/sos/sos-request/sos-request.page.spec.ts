import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SosRequestPage } from './sos-request.page';

describe('SosRequestPage', () => {
  let component: SosRequestPage;
  let fixture: ComponentFixture<SosRequestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SosRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
