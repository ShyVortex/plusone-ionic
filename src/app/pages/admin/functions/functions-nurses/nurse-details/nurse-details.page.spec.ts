import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseDetailsPage } from './nurse-details.page';

describe('NurseDetailsPage', () => {
  let component: NurseDetailsPage;
  let fixture: ComponentFixture<NurseDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
