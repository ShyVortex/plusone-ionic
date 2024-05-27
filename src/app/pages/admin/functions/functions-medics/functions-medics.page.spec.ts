import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunctionsMedicsPage } from './functions-medics.page';

describe('FunctionsMedicsPage', () => {
  let component: FunctionsMedicsPage;
  let fixture: ComponentFixture<FunctionsMedicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsMedicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
