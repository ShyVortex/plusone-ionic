import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDrugPage } from './add-drug.page';

describe('AddDrugPage', () => {
  let component: AddDrugPage;
  let fixture: ComponentFixture<AddDrugPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
