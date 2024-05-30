import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicModifyDetailsPage } from './medic-modify-details.page';

describe('MedicModifyDetailsPage', () => {
  let component: MedicModifyDetailsPage;
  let fixture: ComponentFixture<MedicModifyDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicModifyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
