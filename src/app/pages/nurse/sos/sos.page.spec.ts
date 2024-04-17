import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SOSPage } from './sos.page';

describe('SOSPage', () => {
  let component: SOSPage;
  let fixture: ComponentFixture<SOSPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SOSPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
