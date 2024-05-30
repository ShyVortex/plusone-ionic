import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseModifyDetailsPage } from './nurse-modify-details.page';

describe('NurseModifyDetailsPage', () => {
  let component: NurseModifyDetailsPage;
  let fixture: ComponentFixture<NurseModifyDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseModifyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
