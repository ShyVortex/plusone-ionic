import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SosEmergencyPage } from './sos-emergency.page';

describe('SosEmergencyPage', () => {
  let component: SosEmergencyPage;
  let fixture: ComponentFixture<SosEmergencyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SosEmergencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
