import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExamPage } from './add-exam.page';

describe('AddExamPage', () => {
  let component: AddExamPage;
  let fixture: ComponentFixture<AddExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
