import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicDetailsPage } from './medic-details.page';

describe('MedicDetailsPage', () => {
  let component: MedicDetailsPage;
  let fixture: ComponentFixture<MedicDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
